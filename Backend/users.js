const express = require('express');
const router = express.Router();
const User = require('./Model/users-model');
const Course = require('./Model/courses-model');
const RegisteredCourse = require('./Model/registeredcourses-model');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    const { username, password, name, familyName, shiftStart, shiftEnd, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        username,
        password: hashedPassword,
        name,
        familyName,
        shiftStart,
        shiftEnd,
        role
    };
    try {
        const user = await User.create(newUser);
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({
            errorName: error.name,
            errorMessage: error.message
        });
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        return res.status(200).json(user);
    } else {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
});

router.delete('/delete', async (req, res) => {
    const { username } = req.body;

    try {
        const result = await User.destroy({ where: { username } });
        res.json({ success: result == 0 ? false : true, message: `Deleted ${result} user(s)` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete user' });
    }
});

router.get('/trainer-members/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find all courses taught by the trainer
        const courses = await Course.findAll({
            where: {
                trainerId: id,
            },
        });

        // Extract course IDs from courses array
        const courseIds = courses.map((course) => course.ID);

        // Find all registered courses that match the course IDs
        const registeredCourses = await RegisteredCourse.findAll({
            where: {
                courseId: courseIds,
            },
        });

        // Extract member IDs from registered courses array
        const memberIds = registeredCourses.map((registeredCourse) => registeredCourse.memberId);

        // Find all members that match the member IDs
        const members = await User.findAll({
            where: {
                ID: memberIds,
            },
        });

        // Create a new array of member/registeredCourses pairs
        const memberRegisteredCourses = members.map((member) => {
            // Filter the registeredCourses array to find all courses for this member
            const memberCourses = registeredCourses.filter((registeredCourse) => registeredCourse.memberId === member.ID);

            // Map the memberCourses to an array of course objects
            const courses = memberCourses.map((registeredCourse) => {
                return {
                    courseId: registeredCourse.courseId,
                    registeredCourseId: registeredCourse.ID,
                };
            });

            // Return an object that pairs the member with their registered courses
            return {
                member: member.toJSON(),
                registeredCourses: courses,
            };
        });

        res.json(memberRegisteredCourses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch trainer members' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch user' });
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password, name, familyName, shiftStart, shiftEnd, role } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (username) {
            user.username = username;
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        if (name) {
            user.name = name;
        }
        if (familyName) {
            user.familyName = familyName;
        }
        if (shiftStart) {
            user.shiftStart = shiftStart;
        }
        if (shiftEnd) {
            user.shiftEnd = shiftEnd;
        }
        if (role) {
            user.role = role;
        }

        // Save the updated user to the database
        await user.save();

        res.json({ success: true, message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update user' });
    }
});



module.exports = router;
