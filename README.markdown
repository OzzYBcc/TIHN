# TIHN - The Inner Haven Network

## Overview
This is a Discord bot developed using Discord.js for my personal Discord server network, The Inner Haven Network. The network consists of a main server and 10+ linked mini-servers, each catering to specific areas of interest. The bot manages membership by requiring users to be in the main server, provides reaction-based one-time invites to mini-servers, and performs hourly checks to remove members who leave the main server. Invites are limited to one use and expire after one hour to prevent leaking.

## Technologies
- **Language**: JavaScript (Node.js)
- **Framework**: Discord.js
- **Dependencies**: `dotenv` (for environment variables), `fs` (for file handling)
- **Configuration**: `config.json` for server IDs and settings

## Features
- **Membership Management**:
  - Checks new members in linked servers against the main server (`memberJoin.js`).
  - Kicks users not present in the main server (`scheduleCheck.js`, hourly interval).
- **Invite System**:
  - Generates one-time invites (1-hour expiry) via reactions in a designated channel (`reactionRole.js`).
  - Provides slash command `/invite` for manual invite generation (`invite.js`).
- **Event Handling**:
  - Logs bot readiness (`ready.js`).
  - Tracks reaction removals (`reactionRemove.js`).
- **Security**:
  - Ensures invites are unique and temporary.
  - Automatically removes unauthorized members from mini-servers.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/OzzYBcc/TIHN.git
   ```
2. Navigate to the project directory:
   ```
   cd TIHN
   ```
3. Install dependencies:
   ```
   npm install discord.js dotenv
   ```
4. Create a `.env` file with your Discord bot token:
   ```
   DISCORD_TOKEN=your_bot_token_here
   ```
5. Update `config.json` with your server IDs and emoji mappings.
6. Run the bot:
   ```
   node index.js
   ```

## Usage
- **Setup**: Configure `config.json` with your main server ID, linked server IDs, reaction channel ID, and emoji-to-server mappings.
- **Reaction Invites**: Users react with an emoji (e.g., 📈) in the reaction channel to receive a DM invite to the corresponding server.
- **Slash Command**: Use `/invite` with a server choice to get a one-time invite.
- **Membership Check**: The bot runs every hour to kick members not in the main server.
- **Sample Code Snippet (reactionRole.js)**:
  ```javascript
  module.exports = {
      name: 'messageReactionAdd',
      async execute(client, reaction, user) {
          if (user.bot) return;
          if (reaction.message.channel.id !== config.reactionChannelId) return;
          const emoji = reaction.emoji.name;
          const guildId = config.serverInvites[emoji];
          if (!guildId) return;
          const guild = await client.guilds.fetch(guildId);
          const invite = await guild.invites.create(guild.systemChannel || guild.channels.cache.first(), {
              maxUses: 1,
              unique: true,
              maxAge: 3600
          });
          await user.send(`Here is your one-time invite: ${invite.url}`);
          console.log(`📩 Sent invite to ${user.tag} for ${guild.name}`);
      }
  };
  ```

## Contributing
Contributions are welcome! Enhance features (e.g., add role assignments, improve logging) by forking the repository and submitting a pull request.

## License
MIT License