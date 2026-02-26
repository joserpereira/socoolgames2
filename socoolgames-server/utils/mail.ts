const { Logger } = require('../utils/loggerUtils');
const loggerUtils = new Logger();
const nodemailer = require('nodemailer');

const sendEmail = async (subjectParam: string, content: string, 
                         toName: string, toEmail: string,
                         fromName: string, fromEmail: string, 
                         username: string, passParam: string) => {

    return new Promise((resolve,reject)=>{

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: username,
            pass: passParam
        }
        });
        // logger.info("fromParam", fromParam)
        // fix: remove comma with space othwise send will split name and send just a part
        fromName = (fromName || "").replace(",", " ");
        toName = (toName || "").replace(",", " ");

        var mailOptions = {
            from: (fromName ? (fromName + " <" + fromEmail + '>') : fromEmail), 
            to: (toName ? (toName + " <" + toEmail + '>') : toEmail),
            bcc: "gifts@lazulilabs.com",
            subject: subjectParam, 
            html: content // replace(/\n/g, '<br />')
        };

        transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                loggerUtils.error("Error Sending email: " + error.message);
                resolve({result: false, serverResponse: error.message});
            } else {
                loggerUtils.info('Email sent: ' + info.response);
                resolve({result: true, serverResponse: info.response});
            }
        });
    })

}

const functions = {
    sendEmail
};
module.exports = functions;