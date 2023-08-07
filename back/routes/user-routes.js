const express = require('express');
const userController = require('../controllers/user-controller');

const router = express.Router();

router.post('/login', userController.login);
router.get('/courses/list/registered', userController.sendEnrolledCourses);

module.exports = router;
