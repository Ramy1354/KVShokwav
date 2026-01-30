import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { supabase } from '../../index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('addxp')
    .setDescription('Manually add XP to a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to add XP to')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('Amount of XP to add')
        .setMinValue(1)
        .setMaxValue(10000)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    // Check if user has administrator permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: '❌ You need **Administrator** permissions to use this command!',
        ephemeral: true
      });
    }

    const user = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');

    try {
      // Get current user data
      let { data: userLevel } = await supabase
        .from('levels')
        .select('*')
        .eq('user_id', user.id)
        .eq('guild_id', interaction.guild.id)
        .single();

      if (!userLevel) {
        // Create new user entry
        const { data: newUser, error } = await supabase
          .from('levels')
          .insert({
            user_id: user.id,
            guild_id: interaction.guild.id,
            xp: 0,
            level: 1,
            total_xp: 0
          })
          .select()
          .single();

        if (error) throw error;
        userLevel = newUser;
      }

      // Calculate new values
      const newTotalXP = userLevel.total_xp + amount;
      const newLevel = Math.floor(newTotalXP / 100) + 1;
      const newCurrentXP = newTotalXP % 100;

      // Update database
      const { error: updateError } = await supabase
        .from('levels')
        .update({
          xp: newCurrentXP,
          level: newLevel,
          total_xp: newTotalXP
        })
        .eq('user_id', user.id)
        .eq('guild_id', interaction.guild.id);

      if (updateError) throw updateError;

      // Try to send DM to user about XP addition
      try {
        await user.send({
          embeds: [{
            color: 0x00ff00,
            title: '🎉 XP Added!',
            description: `You have been awarded **${amount} XP** in **${interaction.guild.name}**`,
            fields: [
              {
                name: 'New Level',
                value: `Level ${newLevel}`,
                inline: true
              },
              {
                name: 'Total XP',
                value: `${newTotalXP} XP`,
                inline: true
              },
              {
                name: 'Added by',
                value: interaction.user.tag,
                inline: true
              }
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: 'KV | Shok.wav Bot'
            }
          }]
        });
      } catch (dmError) {
        console.log('Could not send DM to user (DMs disabled or blocked)');
      }

      await interaction.reply({ 
        content: `✅ Successfully added **${amount} XP** to ${user.tag}!\n` +
                `**New Level:** ${newLevel} | **Total XP:** ${newTotalXP}` 
      });

    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Failed to add XP. Database error occurred.', ephemeral: true });
    }
  },
};