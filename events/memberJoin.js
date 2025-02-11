const config = require('../config.json');

module.exports = {
    name: 'guildMemberAdd',
    async execute(client, member) {
        if (!config.linkedServers.includes(member.guild.id)) return;

        const mainGuild = client.guilds.cache.get(config.mainServerId);
        if (!mainGuild) return console.error('❌ Main server not found!');

        try {
            const mainGuildMember = await mainGuild.members.fetch(member.id).catch(() => null);

            if (!mainGuildMember) {
                await member.kick('User is not in the main server');
                console.log(`❌ Kicked ${member.user.tag} from ${member.guild.name} (Not in Main Server)`);
            }
        } catch (error) {
            console.error(`⚠️ Error checking/kicking ${member.user.tag}:`, error);
        }
    }
};