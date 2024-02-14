const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller');
const middleware = require('../middlewares/users.middleware');

router.route('/')
    .get(controller.getUsers)
    .post(controller.createUser);

router.route('/:userId')
    .get(middleware.userByIdValidation, controller.getUser)
    .patch(middleware.userByIdValidation, controller.updateUser)
    .delete(middleware.userByIdValidation, controller.deleteUser);

module.exports = router;