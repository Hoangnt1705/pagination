const express = require('express');
const router = express.Router();
const { getUser, getUpdateOneUser, deleteOneUser } = require('../controllers/users.controller.js')
router.get('/:id', getUser);
router.put('/:id', getUpdateOneUser);
router.delete('/:id', deleteOneUser);
module.exports = router; 
// module.exports.abc = as // == {abc: as}
