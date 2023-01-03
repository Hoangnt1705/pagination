const bcrypt = require('bcryptjs');
const saltRounds = 10;
const db = require('../utils/database.js');
module.exports.findOneLast = (req, res) => {
    return db.execute(`SELECT users.id, users.name, users.username, users.email, users.website, users.phone, users.password, users.role ,addresses.street, addresses.suite, addresses.city FROM db_blog.users INNER JOIN db_blog.addresses ON users.id = addresses.user_id ORDER BY id DESC LIMIT 1`)
    .then(response => {
        let [records] = response;
        records.forEach((element, index) => {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(element.password, salt);
            element.password = hash;
        })
        res.status(200).json({ records: records });
    })
    .catch(err => console.error(err));

}

module.exports.findOne = (pageSize, offSet, req, res) => {
    db.execute(`SELECT users.id, users.name, users.username, users.email, users.website, users.phone, users.password, users.role ,addresses.street, addresses.suite, addresses.city FROM db_blog.users INNER JOIN db_blog.addresses  ON users.id = addresses.user_id LIMIT ${pageSize} OFFSET ${offSet}`)
    .then(response => {
        let [records] = response;
        records.forEach((element, index) => {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(element.password, salt);
            element.password = hash;
        })
        res.status(200).json({ records: records });
    })
    .catch(err => console.error(err));
}
module.exports.updateOneUser = (id, req, res) => {
    db.execute("select * from db_blog.users")
        .then(response => {
            let [recordCheck] = response;
            let filter = recordCheck.find(index => index.id === Number(id));
            if (filter) {
                db.execute("UPDATE db_blog.users SET `name` = ? , `username`= ?, `website` = ?, `phone` = ? WHERE id = ?", [name, username, website, phone, id])
                    .then(response => {
                        let [records] = response;
                        res.status(200).json(records);
                    })
                    .catch(err => console.log(err));
            }
            else {
                res.status(500).json("not found")
            };
        })
        .catch(err => res.status(500).json(err));

}
module.exports.deleteOneUser = (id ,req, res) => {
    db.execute('SET FOREIGN_KEY_CHECKS=0;')
        .then(response => {
            db.execute('select * from `db_blog`.`users`')
                .then(response => {
                    let [records] = response;
                    let filter = records.findIndex(index => index.id === Number(id));
                    if (filter !== -1) {
                        db.execute('DELETE FROM `db_blog`.`users` WHERE `id` = ?', [id])
                            .then(response => res.json(response))
                            .catch(err => console.log(err));
                    }
                })
        })
        .catch(err => console.log(err));
}