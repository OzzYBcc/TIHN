const config = require('../config.json');

module.exports = {
    name: 'ready',
    execute(client) {
        console.log('🔄 Starting scheduled membership checks...');

        setInterval(async () => {
            const mainGuild = client.guilds.cache.get(config.mainServerId);
            if (!mainGuild) return console.error('❌ Main server not found!');

            for (const guildId of config.linkedServers) {
                const guild = client.guilds.cache.get(guildId);
                if (!guild) continue;

                const members = await guild.members.fetch();
                for (const member of members.values()) {
                    const isInMainGuild = await mainGuild.members.fetch(member.id).catch(() => null);
                    if (!isInMainGuild) {
                        await member.kick('Left the main server');
                        console.log(`❌ Kicked ${member.user.tag} from ${guild.name} (Left Main Server)`);
                    }
                }
            }
        }, 60 * 60 * 1000); // Runs every 1 hour
    }
};