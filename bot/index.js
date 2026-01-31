import dotenv from 'dotenv';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Only load .env if we're not in production (Railway sets env vars directly)
if (process.env.NODE_ENV !== 'production') {
  const envPaths = [
    join(process.cwd(), '.env'),
    join(__dirname, '..', '.env'),
    join(dirname(__dirname), '.env')
  ];

  let envLoaded = false;
  for (const envPath of envPaths) {
    try {
      console.log(`Trying to load: ${envPath}`);
      const result = dotenv.config({ path: envPath });
      if (!result.error) {
        console.log(`Environment loaded from: ${envPath}`);
        envLoaded = true;
        break;
      }
    } catch (error) {
      console.log(`Error loading ${envPath}:`, error.message);
    }
  }

  if (!envLoaded) {
    console.log('Warning: Could not load .env file from any location');
  }
} else {
  console.log('Production mode detected - using Railway environment variables');
}

import { Client, GatewayIntentBits, Collection, REST, Routes, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from 'discord.js';
import { createClient } from '@supabase/supabase-js';
import { readdirSync } from 'fs';

console.log('Current working directory:', process.cwd());
console.log('Debug - Environment variables:');
console.log('DISCORD_TOKEN:', process.env.DISCORD_TOKEN ? 'SET' : 'NOT SET');
console.log('DISCORD_CLIENT_ID:', process.env.DISCORD_CLIENT_ID);
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
  ],
});

console.log('Debug - Environment variables:');
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in environment variables');
  process.exit(1);
}

console.log('Using Supabase URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseKey);

client.commands = new Collection();

const loadCommands = async () => {
  const commands = [];
  const adminCommands = [];
  const commandFolders = readdirSync(join(__dirname, 'commands'));

  console.log(`📂 Found ${commandFolders.length} command folders`);

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
          const cmdJson = command.default.data.toJSON();
          
          // Check if command has admin permissions
          if (cmdJson.default_member_permissions) {
            adminCommands.push(cmdJson);
            console.log(`    ✅ Loaded (ADMIN): ${command.default.data.name}`);
          } else {
            commands.push(cmdJson);
            console.log(`    ✅ Loaded: ${command.default.data.name}`);
          }
        } else {
          console.warn(`    ⚠️ Invalid command structure: ${file}`);
        }
      } catch (error) {
        console.error(`    ❌ Error loading ${file}:`, error.message);
      }
    }
  }

  console.log(`\n📤 Registering ${commands.length + adminCommands.length} total commands...`);

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  // Combine all commands
  const allCommands = [...commands, ...adminCommands];

  console.log(`📊 Bot is in ${client.guilds.cache.size} guild(s)`);

  // Register to all guilds the bot is in
  for (const [guildId, guild] of client.guilds.cache) {
    try {
      console.log(`📍 Registering ${allCommands.length} commands to: ${guild.name}`);
      const result = await rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, guildId), {
        body: allCommands,
      });
      console.log(`✅ Registered ${result.length} commands to ${guild.name}`);
    } catch (err) {
      console.error(`❌ Failed to register to ${guild.name}:`, err.message);
    }
  }
};

client.once('clientReady', async () => {
  console.log(`✅ Logged in as ${client.user.tag}!`);
  console.log(`🤖 Bot is now online and ready!`);
  console.log(`📊 Bot is in ${client.guilds.cache.size} guild(s)`);
  
  // Log guild IDs
  client.guilds.cache.forEach(guild => {
    console.log(`  - ${guild.name} (ID: ${guild.id})`);
  });
  
  // Set custom status
  try {
    await client.user.setPresence({
      activities: [{
        name: 'Well Developed by KVA',
        type: 0 // PLAYING
      }],
      status: 'online'
    });
    console.log('✅ Bot status set to: Well Developed by KVA');
  } catch (error) {
    console.error('❌ Failed to set bot status:', error);
  }
  
  console.log('📝 Loading commands...');
  await loadCommands();
  console.log('✅ Commands loaded successfully!');
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

  // Handle select menu interactions
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

  // Handle button interactions
  if (interaction.isButton()) {
    // Create Ticket Button
    if (interaction.customId.startsWith('create_ticket')) {
      try {
        const user = interaction.user;
        const categoryId = interaction.customId.split('_')[2]; // Extract category ID from button ID
        
        // Check if user already has an open ticket
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

        // Generate ticket number
        const ticketNumber = Math.floor(Math.random() * 10000);

        // Create ticket channel
        const ticketChannel = await interaction.guild.channels.create({
          name: `ticket-${user.id}`,
          type: 0, // Text channel
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

        // Create ticket embed
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

        // Create ticket control buttons
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

    // Close Ticket Button
    if (interaction.customId === 'close_ticket') {
      try {
        const channel = interaction.channel;

        // Check if this is a ticket channel
        if (!channel.name.startsWith('ticket-') && !channel.name.startsWith('claimed-ticket-')) {
          return await interaction.reply({ 
            content: '❌ This button can only be used in ticket channels!', 
            ephemeral: true 
          });
        }

        // Check permissions (ticket owner or staff)
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

        // Delete channel after 10 seconds
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

    // Claim Ticket Button
    if (interaction.customId === 'claim_ticket') {
      try {
        // Check if user has manage channels permission (staff only)
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
          return await interaction.reply({
            content: '❌ Only staff members can claim tickets!',
            ephemeral: true
          });
        }

        const channel = interaction.channel;

        // Check if this is a ticket channel
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

        // Update channel name to show it's claimed
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

client.login(process.env.DISCORD_TOKEN);
