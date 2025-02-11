require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.GuildMember]
});

// Load event handlers
fs.readdirSync('./events').forEach(file => {
    if (file.endsWith('.js')) {
        const event = require(`./events/${file}`);
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
});
console.log("Bot Token:", process.env.DISCORD_TOKEN ? "Loaded" : "Not Found");
client.login(process.env.DISCORD_TOKEN); // Load token from GitHub Secrets or .env