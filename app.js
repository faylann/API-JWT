const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
const postRoute = require('./routes/posts');
require('dotenv/config');

//Connect DB
mongoose.connect(process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, () => console.log('connected to db!'));

//Middlewares
app.use(express.json());

//Route Middlewares
app.get('/', (req, res) => {
    res.send('Home');
});
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

//Listening
app.listen(process.env.PORT);