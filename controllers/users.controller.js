const {findOneLast, findOne, updateOneUser, deleteOneUser} = require('../models/users.model.js')
module.exports.getUser = (req, res) => {
    let { id } = req.params;
    page = 1;
    let pageSize = 3;
    let offSet = (id - 1) * pageSize;
    if (id === "last") {
        return findOneLast(req, res);
    }
    else {
        return findOne(pageSize, offSet, req, res);
    };
};
module.exports.getUpdateOneUser =  (req, res) => {
    let { id } = req.params;
    let { name, username, website, phone } = req.body;
    let form = {
        name: name,
        username: username,
        website: website,
        phone: phone,
    };
   return updateOneUser(id, req, res);
};

module.exports.deleteOneUser = (req, res) => {
    let { id } = req.params;
    return deleteOneUser(id, req, res);
};

