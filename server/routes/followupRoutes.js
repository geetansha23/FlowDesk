const express = require('express');

const router = express.Router();

const auth = require('../middleware/authMiddleware');

const {
  createFollowup,
  getLeadFollowups
} = require('../controllers/followupController');

router.post(
  '/',
  auth,
  createFollowup
);

router.get(
  '/:leadId',
  auth,
  getLeadFollowups
);

module.exports = router;