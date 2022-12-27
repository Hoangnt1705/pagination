const express = require('express');
const app = express();
const port = 3650;
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const pool = mysql.createPool({ host: 'localhost', user: 'root', password: 'Baitulong1@', database: 'db_blog' });
const db = pool.promise();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(express.static('public'));
app.get('/', (req, res) => {

    res.sendFile(path.resolve(__dirname, 'public'));
});

app.get('/api/v1/users', (req, res) => {
    db.execute('SELECT users.id, users.`name`, users.username, users.email, users.website, users.phone, addresses.street, addresses.suite, addresses.city FROM db_blog.users INNER JOIN db_blog.addresses  ON users.id = addresses.user_id;')
        .then(response => {
            let [records] = response;
            res.status(200).json({ records: records });

        })
        .catch(err => console.error(err));
})
app.listen(port, () => {
    console.log(`Listening on port: http://localhost:${port}`);
})