const express = require('express');
const { toggleValidateUser, toggleAdminUser } = require('../controllers/apiController');
const router = express.Router();

// /api
router
    .put('/users/:id/toggle-validate', toggleValidateUser)
    .put('/users/:id/toggle-admin', toggleAdminUser);


module.exports = router;