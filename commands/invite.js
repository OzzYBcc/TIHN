const { SlashCommandBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Get a one-time invite to a linked server')
        .addStringOption(option =>
            option.setName('server')
                .setDescription('Choose the server')
                .setRequired(true)
                .addChoices(
                    { name: '🔥 Server 1', value: 'GUILD_ID_1' },
                    { name: '❄️ Server 2', value: 'GUILD_ID_2' },
                    { name: '🌍 Server 3', value: 'GUILD_ID_3' }
                )),
    async execute(interaction) {
        const guildId = interaction.options.getString('server');
        try {
            const guild = await interaction.client.guilds.fetch(guildId);
            const invite = await guild.invites.create(guild.systemChannel || guild.channels.cache.first(), {
                maxUses: 1,
                unique: true,
                maxAge: 3600
            });

            await interaction.reply({ content: `Here is your invite: ${invite.url}`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Unable to generate invite.', ephemeral: true });
        }
    }
};