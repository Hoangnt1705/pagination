const express = require('express');
const router = express.Router();
const {blogGet, updateBlogHandle, deleteBlogHandle} = require('../controllers/blog.controller.js')
router.get('/:id', blogGet);
router.put('/:id', updateBlogHandle);
router.delete('/:id', deleteBlogHandle);
module.exports = router;