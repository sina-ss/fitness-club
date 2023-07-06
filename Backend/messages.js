const express = require('express');
const router = express.Router();
const User = require('./Model/users-model');
const Course = require('./Model/courses-model');
const Message = require('./Model/messages-model');
const RegisteredCourse = require('./Model/registeredcourses-model');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');


router.post('/sendMessage', async (req, res) => {
    const { senderUsername, receiverUsername, text } = req.body;
    const currentDate = new Date();

    try {
        const newMessage = await Message.create({
            senderUsername,
            receiverUsername,
            date: currentDate,
            text,
        });
        console.log('Message saved to database:', newMessage);
        res.status(200).send('Message sent!');
    } catch (error) {
        console.error('Error saving message to database:', error);
        res.status(500).send('Error sending message');
    }
});

router.get('/userChats', async (req, res) => {
    const { username } = req.body;

    try {
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { senderUsername: username, receiverUsername: { [Op.ne]: username } },
                    { receiverUsername: username, senderUsername: { [Op.ne]: username } },
                ]
            },
            attributes: ['senderUsername', 'receiverUsername'],
            raw: true,
        });

        const usernames = messages.map(message => {
            if (message.senderUsername === username) {
                return message.receiverUsername;
            } else {
                return message.senderUsername;
            }
        });

        const uniqueUsernames = [...new Set(usernames)];

        res.status(200).json(uniqueUsernames);
    } catch (error) {
        console.error('Error retrieving user chats:', error);
        res.status(500).send('Error retrieving user chats');
    }
});

router.post('/senderReceiverChats', async (req, res) => {
    const { currentUsername, otherUsername } = req.body;

    try {
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { senderUsername: currentUsername, receiverUsername: otherUsername },
                    { senderUsername: otherUsername, receiverUsername: currentUsername },
                ]
            },
            attributes: ['senderUsername', 'text'],
            order: [['date', 'ASC']],
            raw: true,
        });

        const texts = messages.map(message => ({ senderUsername: message.senderUsername, text: message.text }));
        res.status(200).json(texts);
    } catch (error) {
        console.error('Error retrieving sender-receiver chats:', error);
        res.status(500).send('Error retrieving sender-receiver chats');
    }
});

module.exports = router;