import dotenv from 'dotenv';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  const envPaths = [
    join(process.cwd(), '.env'),
    join(__dirname, '..', '.env'),
  ];

  for (const envPath of envPaths) {
    try {
      dotenv.config({ path: envPath });
      break;
    } catch (error) {
      // Continue to next path
    }
  }
} else {
  console.log('Production mode - using Railway environment variables');
}

import { Client, GatewayIntentBits, Collection, REST, Routes, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from 'discord.js';
import { createClient } from '@supabase/supabase-js';
import { readdirSync } from 'fs';

// Verify environment variables
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!token || !clientId || !supabaseUrl || !supabaseKey) {
  console.error('❌ Missing required environment variables');
  process.exit(1);
}

console.log('✅ Environment variables loaded');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
  ],
});

export const supabase = createClient(supabaseUrl, supabaseKey);
client.commands = new Collection();

const loadCommands = async () => {
  const commands = [];
  const commandFolders = readdirSync(join(__dirname, 'commands'));

  console.log(`\n📂 Found ${commandFolders.length} command folders`);

  for (const folder of commandFolders) {
    const commandFiles = readdirSync(join(__dirname, 'commands', folder)).filter(
      file => file.endsWith('.js')
    );

    console.log(`  📁 ${folder}: ${commandFiles.length} commands`);

    for (const file of commandFiles) {
      try {
        const command = await import(`./commands/${folder}/${file}`);
        if (command.default && command.default.data) {
          client.commands.set(command.default.data.name, command.default);
          commands.push(command.default.data.toJSON());
          console.log(`    ✅ ${command.default.data.name}`);
        }
      } catch (error) {
        console.error(`    ❌ Error loading ${file}:`, error.message);
      }
    }
  }

  console.log(`\n📤 Registering ${commands.length} commands...`);
  console.log(`📊 Bot is in ${client.guilds.cache.size} guild(s)`);

  const rest = new REST({ version: '10' }).setToken(token);

  // Register commands to all guilds
  for (const guild of client.guilds.cache.values()) {
    try {
      console.log(`📍 Registering to ${guild.name}...`);
      const result = await rest.put(Routes.applicationGuildCommands(clientId, guild.id), {
        body: commands,
      });
      console.log(`✅ SUCCESS: Registered ${result.length} commands to ${guild.name}`);
    } catch (err) {
      console.error(`❌ FAILED to register to ${guild.name}`);
      console.error(`Error: ${err.message}`);
      console.error(`Status: ${err.status}`);
      console.error(`Code: ${err.code}`);
    }
  }
};

client.once('clientReady', async () => {
  console.log(`\n✅ Logged in as ${client.user.tag}`);
  console.log(`🤖 Bot is online and ready`);
  
  try {
    await client.user.setPresence({
      activities: [{ name: 'Well Developed by KVA', type: 0 }],
      status: 'online'
    });
    console.log('✅ Status updated\n');
  } catch (error) {
    console.error('❌ Failed to set status:', error.message);
  }
  
  await loadCommands();
  console.log('✅ All commands loaded!\n');
});

client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      const response = {
        content: 'There was an error while executing this command!',
        ephemeral: true,
      };

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(response);
      } else {
        await interaction.reply(response);
      }
    }
  }

  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === 'help_category') {
      const category = interaction.values[0];
      
      const commandLists = {
        utility: {
          title: '🛠️ Utility Commands',
          commands: [
            '`/help` - Show this help menu',
            '`/test` - Test bot functionality',
            '`/addrole` - Assign roles to users',
            '`/removerole` - Remove roles from users',
            '`/serverinfo` - Show server information',
            '`/userinfo` - Show user information',
            '`/roleinfo` - Show role information',
            '`/botinfo` - Show bot information',
            '`/afk` - Set AFK status',
            '`/nuke` - Delete and recreate channel',
            '`/purge` - Delete user messages'
          ]
        },
        moderation: {
          title: '🔨 Moderation Commands',
          commands: [
            '`/ban` - Ban users from server',
            '`/kick` - Kick users from server',
            '`/mute` - Timeout users',
            '`/unmute` - Remove user timeout',
            '`/warn` - Warn users',
            '`/warnings` - View user warnings',
            '`/lock` - Lock channels',
            '`/unlock` - Unlock channels',
            '`/slowmode` - Set channel slowmode',
            '`/lockdown` - Server-wide lockdown'
          ]
        },
        fun: {
          title: '🎮 Fun Commands',
          commands: [
            '`/8ball` - Magic 8-ball responses',
            '`/coinflip` - Flip a coin',
            '`/roll` - Roll dice',
            '`/joke` - Get random jokes',
            '`/meme` - Get random memes'
          ]
        },
        economy: {
          title: '💰 Economy Commands',
          commands: [
            '`/balance` - Check your balance',
            '`/daily` - Claim daily rewards',
            '`/work` - Work to earn money',
            '`/deposit` - Deposit money to bank',
            '`/withdraw` - Withdraw money from bank'
          ]
        },
        leveling: {
          title: '🎓 Leveling Commands',
          commands: [
            '`/level` - Check XP and level',
            '`/leaderboard` - View top users',
            '`/addxp` - Add XP to user (Admin)',
            '`/removexp` - Remove XP from user (Admin)'
          ]
        },
        tickets: {
          title: '🎟️ Ticket Commands',
          commands: [
            '`/setup` - Setup ticket system (Admin)',
            '`/transcript` - Generate ticket transcript',
            '`/adduser` - Add user to ticket',
            '`/removeuser` - Remove user from ticket'
          ]
        },
        ai: {
          title: '🤖 AI & Image Commands',
          commands: [
            '`/caption` - Generate funny captions',
            '`/describe` - AI image description',
            '`/analyze` - Deep image analysis',
            '`/enhance` - AI image upscaling',
            '`/generate` - Create images from text',
            '`/memeify` - Add meme text to images',
            '`/ocr` - Extract text from images'
          ]
        }
      };

      const selectedCategory = commandLists[category];
      
      if (selectedCategory) {
        const embed = new EmbedBuilder()
          .setColor('#00CED1')
          .setTitle(selectedCategory.title)
          .setDescription(selectedCategory.commands.join('\n'))
          .setFooter({ text: 'Use /help to return to the main menu' })
          .setTimestamp();

        await interaction.update({ embeds: [embed], components: [] });
      }
    }
  }

  if (interaction.isButton()) {
    if (interaction.customId.startsWith('create_ticket')) {
      try {
        const user = interaction.user;
        const categoryId = interaction.customId.split('_')[2];
        
        const existingTicket = interaction.guild.channels.cache.find(
          channel => channel.name === `ticket-${user.id}` && channel.type === 0
        );

        if (existingTicket) {
          return await interaction.reply({ 
            content: `❌ You already have an open ticket: ${existingTicket}`, 
            ephemeral: true 
          });
        }

        await interaction.deferReply({ ephemeral: true });

        const ticketNumber = Math.floor(Math.random() * 10000);

        const ticketChannel = await interaction.guild.channels.create({
          name: `ticket-${user.id}`,
          type: 0,
          parent: categoryId,
          topic: `Ticket #${ticketNumber} - Created by ${user.tag}`,
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone,
              deny: ['ViewChannel'],
            },
            {
              id: user.id,
              allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory', 'AttachFiles'],
            },
            {
              id: interaction.client.user.id,
              allow: ['ViewChannel', 'SendMessages', 'ManageChannels', 'ManageMessages'],
            },
          ],
        });

        const ticketEmbed = new EmbedBuilder()
          .setColor('#4CAF50')
          .setTitle(`🎫 Ticket #${ticketNumber}`)
          .setDescription(`**Created by:** ${user}\n**Status:** Open\n\nPlease describe your issue in detail. A staff member will assist you shortly.`)
          .addFields(
            { name: '📋 Guidelines', value: '• Be respectful and patient\n• Provide detailed information\n• Wait for staff response', inline: true },
            { name: '⏰ Created', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true }
          )
          .setThumbnail(user.displayAvatarURL())
          .setTimestamp();

        const ticketButtons = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('close_ticket')
              .setLabel('🔒 Close Ticket')
              .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
              .setCustomId('claim_ticket')
              .setLabel('🙋 Claim Ticket')
              .setStyle(ButtonStyle.Secondary)
          );

        await ticketChannel.send({ 
          content: `${user} Welcome to your support ticket!`, 
          embeds: [ticketEmbed], 
          components: [ticketButtons] 
        });

        await interaction.editReply({ 
          content: `✅ Ticket #${ticketNumber} created successfully! ${ticketChannel}` 
        });

      } catch (error) {
        console.error('Create ticket error:', error);
        await interaction.editReply({ 
          content: '❌ Failed to create ticket. Please contact an administrator!' 
        });
      }
    }

    if (interaction.customId === 'close_ticket') {
      try {
        const channel = interaction.channel;

        if (!channel.name.startsWith('ticket-') && !channel.name.startsWith('claimed-ticket-')) {
          return await interaction.reply({ 
            content: '❌ This button can only be used in ticket channels!', 
            ephemeral: true 
          });
        }

        const userId = interaction.user.id;
        const isTicketOwner = channel.name === `ticket-${userId}` || channel.name === `claimed-ticket-${userId}`;
        const hasManageChannels = interaction.member.permissions.has(PermissionFlagsBits.ManageChannels);

        if (!isTicketOwner && !hasManageChannels) {
          return await interaction.reply({
            content: '❌ Only the ticket owner or staff can close this ticket!',
            ephemeral: true
          });
        }

        await interaction.deferReply();

        const embed = new EmbedBuilder()
          .setColor('#FF5722')
          .setTitle('🔒 Ticket Closing')
          .setDescription('This ticket will be deleted in 10 seconds...\n\n**Want to save the conversation?** Use `/transcript` before the channel is deleted!')
          .addFields(
            { name: '👮 Closed by', value: interaction.user.toString() },
            { name: '⏰ Closed at', value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
          )
          .setTimestamp();

        await interaction.editReply({ embeds: [embed] });

        setTimeout(async () => {
          try {
            await channel.delete();
          } catch (error) {
            console.error('Failed to delete ticket channel:', error);
          }
        }, 10000);

      } catch (error) {
        console.error('Close ticket error:', error);
        await interaction.reply({ 
          content: '❌ Failed to close ticket!', 
          ephemeral: true 
        });
      }
    }

    if (interaction.customId === 'claim_ticket') {
      try {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
          return await interaction.reply({
            content: '❌ Only staff members can claim tickets!',
            ephemeral: true
          });
        }

        const channel = interaction.channel;

        if (!channel.name.startsWith('ticket-') && !channel.name.startsWith('claimed-ticket-')) {
          return await interaction.reply({ 
            content: '❌ This button can only be used in ticket channels!', 
            ephemeral: true 
          });
        }

        const claimEmbed = new EmbedBuilder()
          .setColor('#2196F3')
          .setTitle('🙋 Ticket Claimed')
          .setDescription(`This ticket has been claimed by ${interaction.user}`)
          .addFields(
            { name: '👤 Staff Member', value: interaction.user.toString(), inline: true },
            { name: '⏰ Claimed At', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
          )
          .setTimestamp();

        await interaction.reply({ embeds: [claimEmbed] });

        await channel.setName(`claimed-${channel.name}`);

      } catch (error) {
        console.error('Claim ticket error:', error);
        await interaction.reply({ 
          content: '❌ Failed to claim ticket!', 
          ephemeral: true 
        });
      }
    }
  }
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const { data: afkData } = await supabase
    .from('afk_users')
    .select('*')
    .eq('user_id', message.author.id)
    .eq('guild_id', message.guild.id)
    .maybeSingle();

  if (afkData) {
    await supabase
      .from('afk_users')
      .delete()
      .eq('user_id', message.author.id)
      .eq('guild_id', message.guild.id);

    await message.reply(`Welcome back! I removed your AFK status.`);
  }

  message.mentions.users.forEach(async user => {
    const { data: mentionedAfk } = await supabase
      .from('afk_users')
      .select('*')
      .eq('user_id', user.id)
      .eq('guild_id', message.guild.id)
      .maybeSingle();

    if (mentionedAfk) {
      await message.reply(
        `${user.tag} is currently AFK: ${mentionedAfk.reason || 'No reason provided'}`
      );
    }
  });
});

client.login(token);

client.on('guildCreate', async guild => {
  console.log(`\n✅ Bot joined guild: ${guild.name}`);
  
  const commands = Array.from(client.commands.values()).map(cmd => cmd.data.toJSON());
  const rest = new REST({ version: '10' }).setToken(token);
  
  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guild.id), {
      body: commands,
    });
    console.log(`✅ Registered ${commands.length} commands to ${guild.name}`);
  } catch (err) {
    console.error(`❌ Failed to register commands:`, err.message);
  }
});
