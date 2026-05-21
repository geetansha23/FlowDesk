const express = require('express');

const router = express.Router();

const upload = require('../middleware/uploadMiddleware');

router.post(
  '/',
  upload.single('file'),
  (req, res) => {
    res.json({
      file: req.file
    });
  }
);

module.exports = router;