const express = require('express');
const router = express.Router();
const User = require('./Model/users-model');
const Course = require('./Model/courses-model');
const bcrypt = require('bcryptjs');


router.get('/all', async (req, res) => {
    try {
        const courses = await Course.findAll({
            include: [{ model: User, as: 'trainer' }]
        });
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch courses' });
    }
});

module.exports = router;
