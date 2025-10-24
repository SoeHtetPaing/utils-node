
const CommonHandler = require('./common');
const DateTimeHandler = require('./datetime');
const MediaHandler = require('./media');

const LogHandler = {
    _requestId: "",
    _projectName: "",
    _className: "",
    _methodName: "",
    _absoluteFile: "",
    _startTime: null,

    // set properties by Genius iQ @20251023
    async start(filepath, filename, projectName, className, methodName) {
        const file = MediaHandler.generateMediaName(filename, "txt");

        if (await MediaHandler.makeDirectory(filepath)) {
            this._requestId = `RequestID: ${DateTimeHandler.getMyanmarTimestamp()}`;
            this._projectName = projectName;
            this._className = className;
            this._methodName = `Method: ${methodName}`;
            this._absoluteFile = MediaHandler.getMediaWithDirectory(filepath, file);
            this._startTime = Date.now();

            await this.write("Start", "text");
        }
    },

    // write custom logs by Genius iQ @20251023
    async write(content, contentType = "text") {
        if (!this._absoluteFile) {
            console.warn("LogHandler not started — call start() first!");
            return;
        }

        let fullContent = DateTimeHandler.getMyanmarHour() + this._getSpace(1) 
                        + DateTimeHandler.getMyanmarMillisecond() + this._getSpace(3)
                        + this._putIntoBracket(this._projectName)
                        + this._putIntoBracket(this._className)
                        + this._getSpace(5);

        switch (contentType) {
            case "text":
                fullContent += content;
                break;
            case "request":
                fullContent += this._putIntoBracket(this._requestId) + this._putIntoBracket(this._methodName)
                            + this._getSpace(5) + this._getRequestFormat(content);
                break;
            case "response":
                fullContent += this._putIntoBracket(this._requestId) + this._putIntoBracket(this._methodName)
                            + this._getSpace(5) + this._getResponseFormat(content);
                break;
            default:
                fullContent += content;
        }

        await MediaHandler.writeText(this._absoluteFile, fullContent + "\n");
    },

    // clear properties by Genius iQ @20251024
    async end() {
        const duration = CommonHandler.convertMillisecondsToMinuteSecondMillisecond((Date.now() - this._startTime));

        fullContent = this._putIntoBracket(`Execute Time: ${duration}`)
                    + this._getSpace(1) + "End" ;
        await this.write(fullContent, "text");

        this._requestId = "";
        this._projectName = "";
        this._className = "";
        this._methodName = "";
        this._absoluteFile = "";
        this._startTime = null;
    },
    
    // private method by Genius iQ @20251023
    _getSpace(count) {
        switch (count) {
            case 1:
                return " ";
            case 3:
                return "   ";
            case 5:
                return "     ";
            default:
                return "\t";
        }
    },

    _putIntoBracket(content) {
        return "[" + content + "]";
    },

    _getRequestFormat(content) {
        return "RequestParam: " + CommonHandler.toJSON({ Request: content });
    },

    _getResponseFormat(content) {
        return "Output: " + CommonHandler.toJSON({ Response: content });
    },
}

module.exports = LogHandler;