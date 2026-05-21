const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead
} = require('../controllers/leadController');

router.get('/', auth, getLeads);
router.get('/:id', auth, getLeadById);
router.post('/', auth, createLead);
router.put('/:id', auth, updateLead);
router.delete('/:id', auth, deleteLead);

module.exports = router;
