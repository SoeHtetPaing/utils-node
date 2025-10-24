const CommonHandler = require('./lib/common');
const DateTimeHandler = require('./lib/datetime');
const MediaHandler = require('./lib/media');
const LogHandler = require('./lib/log');

// const timeZone = "Asia/Seoul";
// console.log("Timestamp", DateTimeHandler.getMyanmarTimestamp());
// console.log("Date", DateTimeHandler.getMyanmarDate());
// console.log("Hour", DateTimeHandler.getMyanmarHour());
// console.log("Millisecond", DateTimeHandler.getMyanmarMillisecond());   
// console.log("Zoned DateTime", DateTimeHandler.getMyanmarDateTime());
// console.log(`DateTime in ${timeZone}:`, DateTimeHandler.getDateTimeByZone(DateTimeHandler.getMyanmarDateTime(), timeZone));

// console.log("Syskey:", CommonHandler.getSyskey());
// console.log("Super Admin:", CommonHandler.getSuperAdmin());
// console.log("Object to JSON:", CommonHandler.toJSON(CommonHandler.getSuperAdmin()));
// console.log("Convert 9999 ms:", CommonHandler.convertMillisecondsToMinuteSecondMillisecond(9999));

// console.log("Generated Media Name (Image):", MediaHandler.generateMediaName("IMG", "png"));
// console.log("Generated Media Name (Video):", MediaHandler.generateMediaName("VID", "mp4"));
// console.log("Generated Media Name (Text):", MediaHandler.generateMediaName("Log", "txt"));
// console.log("Root Path:", MediaHandler.getRootDirectoryName());
// console.log("User Path:", MediaHandler.getMediaWithDirectory('data', 'user.json'));
// console.log("Image Path:", MediaHandler.getMediaWithDirectory('', 'user.png'));

// (async () => {
//     const media = {
//         data: "data:image/png;base64,iVBORw0K...",
//         name: "Profile Picture.png",
//         type: "png",
//     };
//     await LogHandler.start("logs", "MediaLog", "GeniusAPI", "IndexJS", "index");
//     await LogHandler.write(media, "request");
//     await LogHandler.write(CommonHandler.getSuperAdmin(), "response");
//     await LogHandler.end();

//     // optional: test writing after end
//     await LogHandler.write("Process", "text");
// })();

module.exports = {
    CommonHandler,
    DateTimeHandler,
    MediaHandler,
    LogHandler,
};