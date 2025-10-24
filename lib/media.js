const fs = require('fs').promises;
const path = require('path');

const DateTimeHandler = require('./datetime');

const MediaHandler = {
    // get IMG_20250508015000115.png, VID_20250508015000115.mp4 by Genius iQ @20251017
    generateMediaName(prefix, type) {
        let mediaName = "";
        if("txt" == type.toLowerCase()) {
            mediaName = prefix + "_" + DateTimeHandler.getMyanmarDate() + "." + type;
        } else {
            mediaName = prefix + "_" + DateTimeHandler.getMyanmarTimestamp() + "." + type;
        }

        return mediaName;
    },

    // D:\genius_iq\node_js_pj\genius-utils-node by Genius iQ @20251022
    getRootDirectoryName() {        
        return path.resolve(__dirname, '..');
    },

    // D:\genius_iq\node_js_pj\genius-utils-node\folder\file.ext by Genius iQ @20251023
    getMediaWithDirectory(directory, fileName) {
        return path.join(this.getRootDirectoryName(), directory, fileName);
    },

    // make directory by Genius iQ @20251023
    async makeDirectory(directoryName) {
        try {
            const absolutePath = this.getMediaWithDirectory(directoryName, '');
            await fs.mkdir(absolutePath, { recursive: true });
            return true;
        } catch (err) {
            console.error("Failed to create directory:", err);
            return false;
        }
    },

    // append data to media file by Genius iQ @20251023
    async writeText(filePath, data) {
        try {
            await fs.appendFile(filePath, data);
        } catch (err) {
            console.error("Failed to write media file:", err);
            throw err;
        }
    },
}

module.exports = MediaHandler;