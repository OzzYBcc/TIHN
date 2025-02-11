const config = require('../config.json');

module.exports = {
    name: 'messageReactionAdd',
    async execute(client, reaction, user) {
        if (user.bot) return;
        if (reaction.message.channel.id !== config.reactionChannelId) return;

        const emoji = reaction.emoji.name;
        const guildId = config.serverInvites[emoji];
        if (!guildId) return;

        try {
            const guild = await client.guilds.fetch(guildId);
            const invite = await guild.invites.create(guild.systemChannel || guild.channels.cache.first(), {
                maxUses: 1,
                unique: true,
                maxAge: 3600 // Expires in 1 hour
            });

            await user.send(`Here is your one-time invite: ${invite.url}`);
            console.log(`📩 Sent invite to ${user.tag} for ${guild.name}`);
        } catch (error) {
            console.error(`❌ Could not send invite to ${user.tag}:`, error);
        }
    }
};