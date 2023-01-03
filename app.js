const express = require('express');
const app = express();
const port = 3650;
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routers/users.routes.js')
const blogRoutes = require('./routers/blog.routes.js')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});
app.get('/api/v1/blog', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/blog.html'));
});
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/blog', blogRoutes);

app.listen(port, () => {
    console.log(`Listening on port: http://localhost:${port}`);
})