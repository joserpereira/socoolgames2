const mail = require('../utils/mail')
const emailModel = require('../models/email')
//const mailService = require('../services/mail.service')

const { Logger } = require('../utils/loggerUtils');
const { TemplateUtils }  = require('../utils/templateUtils');

const loggerUtils = new Logger();
const template = new TemplateUtils();

export default class MailService {

    public async parserAndSendEmail (templateFile: string, viewBag: any, params: any) {
        try {
            var fs = require('fs');
            var obj = JSON.parse(fs.readFileSync(`./config/${templateFile}.json`, 'utf8'));
            var subj = obj.subject

            var body = obj.body;

            var emailSubject = template.render(subj, viewBag)
            var emailBody = template.render(body, viewBag);

            var result = await this.sendEmail2(
                emailSubject, emailBody, 
                params.toName, params.toEmail, 
                params.fromName, params.fromEmail,
                params.externalID, params.externalType);

            if (result.error == 0) {
                return {error: 0, message: '', data: null};
            } else {
                loggerUtils.error("Failed to send email: " + result.message)
                return {error: result.error, message: result.message, data: null};
            }
                
        } catch (error: any) {
            loggerUtils.error("send email error: " + error.message)
            return {error: 901, message: 'There was an error sending email. ' + error.message, data: null};
        }
    }

    public async sendEmail2 (email_subject: any, email_content: any, 
             to_name: any, to_email: any, 
             from_name: any, from_email: any,
             externalID = "", externalType = "") {      

        const server_username = process.env.EMAIL_USERNAME;
        const server_pass = process.env.EMAIL_PASS;

        var email = {
            fromName: from_name,
            fromEmail: from_email,
            toName: to_name,
            toEmail: to_email,
            subject: email_subject,
            content: email_content,
            externalID: externalID, 
            externalType: externalType,
            serverUsername: server_username,
            status: "",
            serverResponse: ""
        }

        try {
            var response = await mail.sendEmail(email_subject, email_content, 
                to_name, to_email, 
                from_name, from_email,
                server_username, server_pass)

            email.status = response.result ? "OK" : "EMAIL_ERROR";            
            email.serverResponse = response.serverResponse;            
        } catch (error: any) {
            email.status = "INTERNAL_ERROR"
            email.serverResponse = error.message
            loggerUtils.error("email intern error: " + error.message)
        }

        try {
            emailModel.create(email)
            return {error: email.status == "OK" ? 0 : 999, message: email.serverResponse}
        } catch (error: any) {
            loggerUtils.error("email creation error: " + error.message)
            return {error: 999, message: email.serverResponse + " " + error.message}
        }
    }
}