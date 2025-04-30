const { execSync } = require('child_process');
const { wakeOnLan } = require('./config.json');
const logger = require("./logger.js");

function Wake() {
    if (!wakeOnLan.enabled) {
        console.log("WakeOnLan disabled in config.json");
        logger.LogError("WakeOnLan disabled in config.json");
        return null;
    }
    if (wakeOnLan.macAddress === null || wakeOnLan.macAddress === "") {
        console.log("MAC Address empty in config.json");
        logger.LogError("MAC Address empty in config.json");
        return null;
    }

    try {
        const output = execSync(`wakeonlan ${wakeOnLan.macAddress}`, { encoding: 'utf-8' });
        console.log(output);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        logger.LogError(`Error: ${error.message}`);
    }
}

module.exports = { Wake }
