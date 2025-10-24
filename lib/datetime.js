const DateTimeHandler = {
    // get yyyyMMddHHmmSSS by Genius iQ @20251017
    getMyanmarTimestamp() {
        const now = this.getMyanmarZonedDateTime();
        return `${now.year}${now.month}${now.day}${now.hour}${now.minute}${now.second}${now.millisecond
        .toString()
        .padStart(3, "0")}`;
    },

    // get yyyyMMdd by Genius iQ @20251017
    getMyanmarDate() {
        const now = this.getMyanmarZonedDateTime();
        return `${now.year}${now.month}${now.day}`;
    },

    // get hh:mm:ss a by Genius iQ @20251017
    getMyanmarHour() {
        const now = this.getMyanmarZonedDateTime();
        return `${now.hour}:${now.minute}:${now.second} ${now.ampm.toUpperCase()}`;
    },

    // get SSSSS by Genius iQ @20251017
    getMyanmarMillisecond() {
        const now = this.getMyanmarZonedDateTime();
        return now.millisecond.toString().padStart(5, "0") + " MS";
    },

    // get Zoned Time String by Genius iQ @20251017
    getMyanmarDateTime() {
        const now = this.getMyanmarZonedDateTime();
        return `${now.year}-${now.month}-${now.day} ${now.hour}:${now.minute}:${now.second} ${now.ampm.toUpperCase()}`;
    },

    // get target Zoned Time String by Genius iQ @20251017
    getDateTimeByZone(dateStr, targetZone) {
        const [datePart, timePart, meridian] = dateStr.split(" ");
        const [year, month, day] = datePart.split("-").map(Number);
        let [hour, minute, second] = timePart.split(":").map(Number);

        if (meridian.toUpperCase() === "PM" && hour < 12) hour += 12;
        if (meridian.toUpperCase() === "AM" && hour === 12) hour = 0;

        const yangonOffsetMinutes = 6 * 60 + 30; // +6:30
        const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute - yangonOffsetMinutes, second));

        const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: targetZone,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });

        const parts = formatter.formatToParts(utcDate);
        const vals = Object.fromEntries(parts.map(p => [p.type, p.value]));

        return `${vals.year}-${vals.month}-${vals.day} ${vals.hour}:${vals.minute}:${vals.second} ${vals.dayPeriod}`;
    },

    // get Myanmar DateTime by Genius iQ @20251017
    getMyanmarZonedDateTime() {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Yangon",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        });

        const parts = formatter.formatToParts(now);
        const get = (type) => parts.find((p) => p.type === type)?.value || "00";

        return {
            year: get("year"),
            month: get("month"),
            day: get("day"),
            hour: get("hour"),
            minute: get("minute"),
            second: get("second"),
            ampm: get("dayPeriod") || "",
            millisecond: now.getMilliseconds(),
        };
    },
}

module.exports = DateTimeHandler;