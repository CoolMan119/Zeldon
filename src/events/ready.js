module.exports = (client) => {
    const channelSize = client.channels.size
    const guildSize = client.guilds.size
    const userSize = client.users.size

    client.controllers.logger.debug("Loading ready event...");
    client.controllers.logger.info("");
    client.controllers.logger.info("▀▀█ █▀▀ █░░ █▀▀▄ █▀▀█ █▀▀▄");
    client.controllers.logger.info("▄▀░ █▀▀ █░░ █░░█ █░░█ █░░█");
    client.controllers.logger.info("▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀░ ▀▀▀▀ ▀░░▀");
    client.controllers.logger.info("");
    client.controllers.logger.info("=-=-=-=-=-=-=-=-=-=-=-=-=-=")
    client.controllers.logger.info(`Channels | ${channelSize}`);
    client.controllers.logger.info(`Guilds   | ${guildSize}`);
    client.controllers.logger.info(`Users    | ${userSize}`);
    client.controllers.logger.info("");
    client.controllers.logger.info(`Version  | ${client.version}`);
    client.controllers.logger.info("=-=-=-=-=-=-=-=-=-=-=-=-=-=");

}