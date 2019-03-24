const fs = require("fs");

const defaultSettingsObj = {
    maximumSongLength: 0, // 0 = unlimited
    prefix: "?"
}

class Util {
    constructor() {}
    defaultSettings() {
        return defaultSettingsObj
    }

    parseDMY() {
        var rawDate = new Date();
        var rawDate = rawDate.toISOString().slice(0, 10);
        var dateSplit = rawDate.split("-");

        var year = dateSplit[0];
        var month = dateSplit[1];
        var day = datesplit[2];

        return month, day, year;
    }
    getDate() {
        var rawDate = new Date();
        var rawDate = rawDate.toISOString().slice(0, 10);
        return rawDate;
    }
    readJSON(jsonFile) {
        rawData = fs.readFileSync(jsonFile);
        parsedJSON = JSON.parse(rawData);
        return parsedJSON;
    }
}

module.exports = Util;