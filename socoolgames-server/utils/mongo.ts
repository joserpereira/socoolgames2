import { Logger } from '../utils/loggerUtils';
const loggerUtils = new Logger();

const getFilterByParameter = (req) => {
  try {
    var filter = {}
    if (req.query) {
        for (var item in req.query) {
            filter[item] = req.query[item]
        }
    }
    return filter;
  }
  catch(error: any) 
  {
    loggerUtils.error(error.message)
    return {}
  };
};

const getPaginationParameters = (filter) => {
  try {
      var limit = 0;
      var skip = 0;
      var search = "";
      if (filter["__search"]) {
          search = filter["__search"];
          delete filter["__search"]
      }
      if (filter["__limit"]) {
          limit = filter["__limit"];
          delete filter["__limit"]
      }
      if (filter["__skip"]) {
          skip = filter["__skip"];
          delete filter["__skip"]
      }
      return { filter, limit, skip, search };
  }
  catch(error: any) 
  {
    loggerUtils.error(error.message)
    return { filter, limit: 20, skip: 0 }
  };
};

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
const functions = {
    getFilterByParameter, getPaginationParameters, omitPassword
};
module.exports = functions;