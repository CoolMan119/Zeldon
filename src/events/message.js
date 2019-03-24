module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;

    const guildConfiguration = client.settings.ensure(message.guild.id, client.defaultSettings)
    let prefix = guildConfiguration.prefix

    if (message.content.indexOf(prefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);
};