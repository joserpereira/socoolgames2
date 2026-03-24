const escapeRegExp = (value: string) => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
  
const replaceAll = (value: string, find: string, replace: string) => {
    return value.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

const functions = {    
    replaceAll, escapeRegExp
};

module.exports = functions;