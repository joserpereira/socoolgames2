const UserModel = require('../models/user')
const RoleModel = require('../models/role')
import { Logger } from '../utils/loggerUtils';

const loggerUtils = new Logger();
const mongoUtils = require('../utils/mongo')
const bcrypt = require('bcryptjs');

async function getStats(): Promise<any>    {
   const itemTotal = await UserModel.countDocuments({deleted: { $ne: true }});
   const itemActive = await UserModel.countDocuments({ deleted: { $ne: true }, active: true });
   const itemDeleted = await UserModel.countDocuments({ deleted: true });

   return { total: itemTotal, active: itemActive, deleted: itemDeleted };
}

async function getUsers(filter: any): Promise<any> {
    try
    {
        loggerUtils.debug("get users")
        const items = await UserModel.find(filter, {name: true, company: true, email: true, createdAt: true});
        return {error: 0, message: '', data: items}
    }
    catch(error: any)
    {
        loggerUtils.error("Get Users Error: " + error.message)
        return {error: 999, message: error.message, data: null}
    }
}

async function createUser(newUser: any): Promise<any> {
    try
    {
        loggerUtils.debug("user create")
        // Check if the email already exists
        const alreadyExist = await UserModel.find({ email: newUser.email });
        if (alreadyExist.length > 0) {
            loggerUtils.debug("Email already registered: " + newUser.email)
            return {error: 901, message: 'Email already registered', data: null};
        }

        if (process.env.SIGN_INVITE_CODE !== undefined && newUser.inviteCode !== process.env.SIGN_INVITE_CODE) {
            loggerUtils.debug("Failed to register, wrong invitation code: " + newUser.email)
            return {error: 903, message: 'Wrong invitation code', data: null};

        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);

        if (!newUser.password || newUser.password.length < 6) {
            return {error: 902, message: 'Invalid password', data: null}
        }

        const hashedPassword = await bcrypt.hash(newUser.password, salt);

        let roleName = "user";
        const countUsers = await UserModel.countDocuments().exec();
        if (countUsers === 0) {
            roleName = "admin";
        }

        // Registration logic here
        const user = new UserModel({
            name: newUser.name,
            email: newUser.email,
            password: hashedPassword
        });
        
        const role = await RoleModel.findOne({ name: roleName });
        user.roles = [role._id];

        const newitem = await UserModel.create(user);
        loggerUtils.debug("user created")

        var data = mongoUtils.omitPassword(newitem._doc);
        return {error: 0, message: '', data: data}
    }
    catch(error: any)
    {
        loggerUtils.error(error.message)
        return {error: 999, message: error.message}
    }
}

async function deleteUser(id: string, userId: string) {
    try
    {
        var filter = { _id: id }
        const update = { deleted: true, deleteAt: new Date(Date.now()), deletedBy: userId };
        const item = await UserModel.findOneAndUpdate(filter, update);
        if (!item) {
            return {error: 404, message: `Cannot find any user with ID '${id}'`};
        }

        return {error: 0, message: '', data: item}
    }
    catch(error: any)
    {
        loggerUtils.error("Delete User Error: " + error.message)
        return {error: 999, message: error.message, data: null}
    }
}

const exportedFunctions = {
    getStats, getUsers, deleteUser, createUser
};
module.exports = exportedFunctions;