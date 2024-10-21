require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/user-roles-perm');

const express = require('express');

const app = express();
app.use(express.json());

app.use(express.static('public'));

// AUTH ROUTE
const authRoute = require('./routes/authRoute');
app.use('/api', authRoute);

// ADMIN ROUTE
const adminRoute = require('./routes/adminRoute');
app.use('/api/admin', adminRoute);

// ADMIN ROUTE
const commonRoute = require('./routes/commonRoute');
app.use('/api', commonRoute);

const port = process.env.SERVER_PORT | 3000;

app.listen(port, () => {
    console.log('🚀 Server is running on port', port);
});
