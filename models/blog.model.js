const db = require('../utils/database.js');
module.exports.blogFindLast = (req, res) => {
    return db.execute(`SELECT db_blog.blog.userId, db_blog.blog.id, db_blog.blog.title, db_blog.blog.body, db_blog.users.image FROM db_blog.users INNER JOIN db_blog.blog ON db_blog.blog.userId = db_blog.users.id ORDER BY id DESC LIMIT 1`)
        .then(response => {
            let [records] = response;
            console.log(response);
            res.status(200).json({ records: records });
        })
        .catch(err => console.error(err));
}
module.exports.blogFind = (pageSize, offSet, req, res) => {
    return db.execute(`SELECT db_blog.blog.userId, db_blog.blog.id, db_blog.blog.title, db_blog.blog.body, db_blog.users.image FROM db_blog.users INNER JOIN db_blog.blog ON db_blog.blog.userId = db_blog.users.id ORDER BY db_blog.blog.id LIMIT ${pageSize} OFFSET ${offSet}`)
        .then(response => {
            let [records] = response;
            console.log(response);
            res.status(200).json({ records: records });
        })
        .catch(err => console.error(err));
}
module.exports.updateBlog = (id, req, res) => {
    return db.execute("select * from db_blog.blog")
        .then(response => {
            let [recordCheck] = response;
            let filter = recordCheck.find(index => index.id === Number(id));
            if (filter) {
                db.execute("UPDATE db_blog.blog SET `title` = ? , `body`= ? WHERE id = ?", [title, body, id])
                    .then(response => {
                        let [records] = response;
                        res.status(200).json(records);
                    })
                    .catch(err => console.log(err));
            }
            else {
                res.status(500).json("not found blog")
            };
        })
        .catch(err => res.status(500).json(err));
}

module.exports.deleteBlog = (id, req, res) => {
    return db.execute('SET FOREIGN_KEY_CHECKS=0;')
        .then(response => {
            db.execute('select * from `db_blog`.`blog`')
                .then(response => {
                    let [records] = response;
                    let filter = records.findIndex(index => index.id === Number(id));
                    if (filter !== -1) {
                        db.execute('DELETE FROM `db_blog`.`blog` WHERE `id` = ?', [id])
                            .then(response => res.json(response))
                            .catch(err => console.log(err));
                    }
                })
        })
        .catch(err => console.log(err));
}