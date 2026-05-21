const express = require('express');

const router = express.Router();

const auth = require('../middleware/authMiddleware');

const role = require('../middleware/roleMiddleware');

const {
  monthlyReport
} = require('../controllers/reportController');

/*
  REPORT ROUTES
*/
router.get(
  '/monthly',
  auth,
  role('Admin', 'Admissions'),
  monthlyReport
);

module.exports = router;