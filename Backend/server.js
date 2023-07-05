const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const users = require('./users');
const courses = require('./courses');
const registeredcourses = require('./registeredcourses');
const { Sequelize, DataTypes } = require('sequelize');
const User = require('./Model/users-model');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/users', users);
app.use('/courses', courses);
app.use('/registeredcourses', registeredcourses);

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    // Retrieve the user from the database.
    // Replace with your actual database query.
    const user = await getUserFromDatabase(username);

    if (!user) {
        // Handle case when user is not found
        return res.status(401).send('Unauthorized');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
        // Handle case when password is not valid
        return res.status(401).send('Unauthorized');
    }

    // User is authenticated, create a JWT.
    const token = jwt.sign({ userId: user.id }, 'your_secret_key');

    // Set the JWT as a cookie.
    res.cookie('token', token, { httpOnly: true });
    res.send('Logged in');
});

app.listen(3000, () => console.log('Server listening on port 3000'));
