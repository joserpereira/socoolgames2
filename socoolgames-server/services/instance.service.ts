import { Logger } from '../utils/loggerUtils';

const loggerUtils = new Logger();

async function getStats(collectionName: string): Promise<any>    {
   const model = require('../models/' + collectionName)
   const itemTotal = await model.countDocuments({deleted: { $ne: true }});
   const itemActive = await model.countDocuments({ deleted: { $ne: true }, active: true });
   const itemDeleted = await model.countDocuments({ deleted: true });

   return { total: itemTotal, active: itemActive, deleted: itemDeleted };
}

async function getItems(collectionName: string, filter: any, skip = 0, limit = 5, search = ''): Promise<any> {
    try
    {
        var filter = getFilter(filter, search);
        const model = require('../models/' + collectionName)
        loggerUtils.debug("get items")
        const items = await model.find(filter).skip(skip).limit(limit).sort({'_id': -1});
        const total = await model.find(filter).countDocuments();
        return {error: 0, message: '', data: items, count: total}
    }
    catch(error: any)
    {
        loggerUtils.error("Get Items Error: " + error.message)
        return {error: 999, message: error.message, data: null}
    }
}

async function getItemWithFilter(collectionName: string, filter: any): Promise<any> {
    try
    {
        const model = require('../models/' + collectionName)
        loggerUtils.debug("get items")
        const items = await model.findOne(filter);
        return {error: 0, message: '', data: items}
    }
    catch(error: any)
    {
        loggerUtils.error("Get Items Error: " + error.message)
        return {error: 999, message: error.message, data: null}
    }
}

async function getItem(collectionName: string, id: string): Promise<any> {
    try
    {
        const model = require('../models/' + collectionName)
        loggerUtils.debug("get items")
        const items = await model.findOne({ _id: id });
        return {error: 0, message: '', data: items}
    }
    catch(error: any)
    {
        loggerUtils.error("Get Items Error: " + error.message)
        return {error: 999, message: error.message, data: null}
    }
}

async function updateItem(collectionName: string, id: string, item: any): Promise<any> {
    try
    {
        const model = require('../models/' + collectionName)
        loggerUtils.debug("item update")
        // Check if the email already exists

        // Registration logic here
        var filter = { _id: id }
        const newItem = await model.findOneAndUpdate(filter, item, { returnDocument: true });
        if (!newItem) {
            return {error: 901, message: 'There is an issue with event please try again later or contact support.', data: null};
        }

        loggerUtils.debug("item updated")

        return {error: 0, message: '', data: newItem}
    }
    catch(error: any)
    {
        loggerUtils.error(error.message)
        return {error: 999, message: error.message}
    }
}

async function createItem(collectionName: string, newItem: any): Promise<any> {
    try
    {
        const model = require('../models/' + collectionName)
        loggerUtils.debug("item create")
        // Check if the email already exists

        // Registration logic here
        const item = new model(newItem);
        
        const newitem = await model.create(item);
        loggerUtils.debug("item created")

        return {error: 0, message: '', data: newitem}
    }
    catch(error: any)
    {
        loggerUtils.error(error.message)
        return {error: 999, message: error.message}
    }
}

async function deleteItem(collectionName: string, id: string, userId: string) {
    try
    {
        const model = require('../models/' + collectionName)
        var filter = { _id: id }
        const update = { deleted: true, deleteAt: new Date(Date.now()), deletedBy: userId };
        const item = await model.findOneAndUpdate(filter, update);
        if (!item) {
            return {error: 404, message: `Cannot find any ${collectionName} with ID '${id}'`};
        }

        return {error: 0, message: '', data: item}
    }
    catch(error: any)
    {
        loggerUtils.error(`Delete ${collectionName} Error: ${error.message}`);
        return {error: 999, message: error.message, data: null}
    }
}

function getFilter(filter: any, search: string) {
    var filter = { deleted: { $ne: true }, ...filter }
    
    if (search?.length > 0) {
        filter = { $or: [ { title: { $regex: (search), $options: 'i' }}, { description: { $regex: (search), $options: 'i' }} ], ...filter }
    }
    return filter;
}

const exportedFunctions = {
    getStats, getItems, getItemWithFilter, deleteItem, createItem, getItem, updateItem
};
module.exports = exportedFunctions;