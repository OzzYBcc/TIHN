module.exports = {
    name: 'messageReactionRemove',
    execute(client, reaction, user) {
        console.log(`❌ ${user.tag} removed their reaction: ${reaction.emoji.name}`);
    }
};