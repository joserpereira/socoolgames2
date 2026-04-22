const ContactUsModel = require('../models/contactus')
const { Logger } = require('../utils/loggerUtils');
const loggerUtils = new Logger();

async function getItems(filter: any, skip: number = 0, limit: number = 5): Promise<any>    {
    filter = { deleted: { $ne: true }, ...filter }
    const items = await ContactUsModel.find(filter).skip(skip).limit(limit).sort({'_id': -1});
    const total = await ContactUsModel.find(filter).countDocuments();
    return { data: items || [], count: total };
}

async function getItem(filter: any): Promise<any> {
    filter = { deleted: { $ne: true }, ...filter }
    const item = await ContactUsModel.findOne(filter);

    return item || {};
}


async function getStats(): Promise<any>    {
    const itemTotal = await ContactUsModel.countDocuments({deleted: { $ne: true }});
    const itemActive = await ContactUsModel.countDocuments({ deleted: { $ne: true }, active: true });
    const itemDeleted = await ContactUsModel.countDocuments({ deleted: true });

    return { total: itemTotal, active: itemActive, deleted: itemDeleted };
}

const insertItem = async (item: any) => {
    const newItem = await ContactUsModel.create(item);

    loggerUtils.info("link created", newItem._doc)
    return {error: 0, message: '', data: newItem._doc};
}

const updateItem = async (id: string, item: any) => {
    var filter = { _id: id }
    const link = await ContactUsModel.findOneAndUpdate(filter, item, { new: true });
    if (!link) {
        return {error: 901, message: 'There is an issue with event please try again later or contact support.', data: null};
    }

    return {error: 0, message: '', data: link};
}

const deleteItem = async (id: string) => {
    var filter = { _id: id }
    const update = { deleted: true, deleteAt: new Date(Date.now()) };

    const link = await ContactUsModel.findOneAndUpdate(filter, update);
    if (!link) {
        return {error: 901, message: 'There is an issue with event please try again later or contact support.', data: null};
    }

    return {error: 0, message: '', data: link};
}

const exportedFunctions = {
    insertItem, updateItem, deleteItem, getItems, getItem, getStats
};

module.exports = exportedFunctions;