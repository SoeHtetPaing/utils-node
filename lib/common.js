const DateTimeHandler = require('./datetime');

const CommonHandler = {
    // get syskey by Genius iQ @20251017
    getSyskey() {
        return DateTimeHandler.getMyanmarTimestamp().substring(2, 17);
    },

    // get super admin by Genius iQ @20251017
    getSuperAdmin() {
        const superAdmin = {
            "syskey": 1,
            "userid": "genius.iq",
            "username": "Soe Htet Paing"
        };

        return superAdmin;
    },

    // Object to JSON by Genius iQ @20251017
    toJSON(object) {
        return JSON.stringify(object);
    },

    // convert millsecond to 0m 0s 10 ms format by Genius iQ @20251024
    convertMillisecondsToMinuteSecondMillisecond(ms) {
        if (ms < 1000) {
            return `${ms.toFixed(0)} ms`;
        }

        const sec = ms / 1000;
        if (sec < 60) {
            return `${sec.toFixed(2)} sec`;
        }

        const min = Math.floor(sec / 60);
        sec = (sec % 60).toFixed(2);
        return `${min} min ${sec} sec`;
    },
}

module.exports = CommonHandler;