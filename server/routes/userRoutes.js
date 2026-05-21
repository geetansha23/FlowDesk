const express = require('express');

const router = express.Router();

const auth = require('../middleware/authMiddleware');

const {
  getProfile,
  updateProfile,
  updatePassword
} = require('../controllers/userController');

router.get(
  '/profile',
  auth,
  getProfile
);

router.put(
  '/profile',
  auth,
  updateProfile
);

router.put(
  '/password',
  auth,
  updatePassword
);
router.get(
  '/counselors',
  auth,
  getCounselors
);
module.exports = router;