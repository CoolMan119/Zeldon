'use strict';
/*
 *  ZELDON
 *  BY: OCTO DEVELOPMENT
 *
 *  IF YOU USE THE SOURCE CODE OF THIS BOT,
 *  YOU MUST GIVE ME CREDIT.
 *
 *  Copyright (c) 2018 Octo-Development
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.

 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

//  █▀▀█ █▀▀ ▀▀█▀▀ █▀▀█   █▀▀▄ █▀▀ ▀█░█▀ █▀▀ █░░ █▀▀█ █▀▀█ █▀▄▀█ █▀▀ █▀▀▄ ▀▀█▀▀
//  █░░█ █░░ ░░█░░ █░░█   █░░█ █▀▀ ░█▄█░ █▀▀ █░░ █░░█ █░░█ █░▀░█ █▀▀ █░░█ ░░█░░
//  ▀▀▀▀ ▀▀▀ ░░▀░░ ▀▀▀▀   ▀▀▀░ ▀▀▀ ░░▀░░ ▀▀▀ ▀▀▀ ▀▀▀▀ █▀▀▀ ▀░░░▀ ▀▀▀ ▀░░▀ ░░▀░░


const Discord = require("discord.js");
const client = new Discord.Client();
const Controllers = require("./controllers");
const Enmap = require("enmap");
const ytdl = require("ytdl-core")
const readline = require("readline");
const fs = require("fs");

client.version = 1
client.branch = "bleeding"

client.controllers = {}

client.controllers.utils = new Controllers.Util();
client.controllers.logger = new Controllers.Logger({showDebug: false});

client.defaultSettings = { 
    /*
     * These are the default settings for the bot. These settings
     * will be able to change using the bot commands later on.
     */
    maxSongLength: 0, // 0 = unlimited

    // This is the default prefix used for the bot, it will be able to get changed
    prefix: "?",

    // These are modules that contains music, administration, announcements, and more.
    modules: {
        announcements: {enabled: false, required: "channel"},
        welcome: {enabled: false, required: "channel"},
        music: {enabled: true, required: false},
        administration: {enabled: true, required: false},
        list: ["announcements","welcome","music","administration"]
    }
}

client.settings = new Enmap({
    name: "settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: "deep"
});

client.commands = new Enmap();

function setValue(objname, objvalue, file) {
    var tmpData = client.controllers.utils.readJSON(file)
    tmpData[objname] = objvalue
    fs.writeFile(file, JSON.stringify(tmpData), (err) => {
        if (err) {
            console.error(err);
            return;
        };
    });
}

client.on("error", (e) => client.controllers.logger.severe(e))
client.on("warn", (e)  => client.controllers.logger.warn(e))


client.controllers.logger.info("Z E L D O N");
client.controllers.logger.info("Initializing...");




fs.readdir("./src/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        // If the file is not a JS file, ignore it (thanks, Apple)
        if (!file.endsWith(".js")) return;
        // Load the event file itself
        const event = require(`./events/${file}`);
        // Get just the event name from the file name
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

fs.readdir("./src/commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        // Load the command file itself
        let props = require(`./commands/${file}`);
        // Get just the command name from the file name
        let commandName = file.split(".")[0];
        client.controllers.logger.info(`Attempting to load command ${commandName}`);
        // Here we simply store the whole thing in the command Enmap. We're not running it right now.
        client.commands.set(commandName, props);
    });
});


client.on("ready", () => {
    client.controllers.logger.info("Ready")
});

client.on("guildDelete", (guild) => {
    // Remove the guild from the settings
    client.settings.delete(message.guild.id);
});


fs.readFile('./src/token.txt', 'utf8', function (err, contents) {
    if (contents == "insert token here") {
        client.controllers.logger.severe("You need to insert a token into 'token.txt'!");
    } else {
        client.login(contents);
    }
});




