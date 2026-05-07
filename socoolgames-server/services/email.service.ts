const mail = require('../utils/mail');
const service = require('../services/instance.service')
const EmailConfigModel = require('../models/emailserverconfig')

async function sendEmail(emailTemplate: string, email: string, language: string): Promise<any> {
    try {

        const filter = {templateName: emailTemplate, deleted: { $ne: true } };
        const result = await service.getItems("emailtemplate", filter, 0, 1, "");

        if (result.error == 0 && result.data.length == 0) {
            console.error("Couldn't find Email Template");
            return { error: 0, message: "", data: "" };    
        }
        
        const templateItem = result.data[0]
        const config = await EmailConfigModel.findOne({configName: templateItem.configName, deleted: { $ne: true } })
        if (!config) {
            console.error("Couldn't find Email Config");
            return { error: 0, message: "", data: "" };    
        }

        const emailSubject = templateItem.emailSubject[language];
        const content = templateItem.emailContent[language];
        const emailName = templateItem.emailName[language];

        mail.sendEmail(emailSubject, 
                                content, 
                                null,
                                email, 
                                emailName,
                                config.emailFrom,
                                config.emailUsername,
                                config.emailPass)

        return { error: 0, message: "", data: "" };
    }
    catch (err: any) {
        console.error(err);
        return { error: 999, message: err.message, data: null };
    }
}

const exportedFunctions = {
    sendEmail
};

module.exports = exportedFunctions;