const {blogFindLast, blogFind, updateBlog, deleteBlog } = require('../models/blog.model.js');
module.exports.blogGet = (req, res) => {
    let { id } = req.params;
    page = 1;
    let pageSize = 3;
    let offSet = (id - 1) * pageSize;
    if (id === "last") {
        return blogFindLast(req, res);
    }
    else {
        return blogFind(pageSize, offSet, req, res);
    };
};
module.exports.updateBlogHandle = (req, res) => {
    let { id } = req.params;
    let { title, body } = req.body;
    let form = {
        title: title,
        body: body,
    };
    return updateBlog(id, req, res);
};
module.exports.deleteBlogHandle = (req, res) => {
    let { id } = req.params;
    return deleteBlog(id, req, res);
};
