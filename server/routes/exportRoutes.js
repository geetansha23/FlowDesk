const express = require('express');

const router = express.Router();

const auth = require('../middleware/authMiddleware');

const {
  exportLeads
} = require('../controllers/exportController');

router.get(
  '/leads',
  auth,
  exportLeads
);

module.exports = router;