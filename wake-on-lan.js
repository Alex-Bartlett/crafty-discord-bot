const { exec } = require('child_process');
const { promisify } = require('util');
const { wakeOnLan } = require('./config.json');
const logger = require("./logger.js");

const execAsync = promisify(exec);

// Returns TRUE if server needs to be awoken
// FALSE if awake
// NULL if error
async function WakeAsync() {
    if (!wakeOnLan.enabled) {
        return null;
    }
    
    if (wakeOnLan.macAddress === null || wakeOnLan.macAddress === "") {
        console.log("MAC Address empty in config.json");
        logger.LogError("MAC Address empty in config.json");
        return null;
    }
    
    try {
        const pingResult = await PingAsync();
        
        if (pingResult === null) {
            return null;
        }
        else if (pingResult) {
            return false;
        }
        else {
            try {
                const { stdout } = await execAsync(`wakeonlan ${wakeOnLan.macAddress}`);
                console.log(stdout);
                return true;
            } catch (error) {
                console.error(`Error: ${error.message}`);
                logger.LogError(`Error: ${error.message}`);
                return false;
            }
        }
    } catch (error) {
        console.error(`Error during wake process: ${error.message}`);
        logger.LogError(`Error during wake process: ${error.message}`);
        return null;
    }
}

async function PingAsync() {
    if (wakeOnLan.ipAddress === null || wakeOnLan.ipAddress === "") {
        console.log("IP Address empty in config.json");
        logger.LogError("IP Address empty in config.json");
        return null;
    }
    
    const timeoutSeconds = 3;
    const pingCommand = `ping -c 1 -W ${timeoutSeconds} ${wakeOnLan.ipAddress}`;
    
    try {
        const { stdout } = await execAsync(pingCommand);
        
        if (stdout.includes('bytes from') || stdout.includes('Reply from')) {
            console.log(`${wakeOnLan.ipAddress} is online`);
            return true;
        } else {
            console.log(`${wakeOnLan.ipAddress} is unreachable (no response)`);
            return false;
        }
    } catch (error) {
        console.log(`${wakeOnLan.ipAddress} is unreachable (timed out after ${timeoutSeconds} seconds)`);
        return false;
    }
}

module.exports = { WakeAsync, PingAsync }
