const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  hardDeleteContact
} = require('../controllers/contactController');
const authenticateToken  = require('../middlewares/authMiddleware');
router.get('/get-all-contacts', authenticateToken, getContacts);
router.get('/get-contact-by-id/:id', authenticateToken, getContactById);
router.post('/create-contact', authenticateToken, createContact);
router.put('/update-contact/:id', authenticateToken, updateContact);
router.delete('/delete-contact/:id', authenticateToken, deleteContact);
router.delete('/hard-delete-contact/:id', authenticateToken, hardDeleteContact);

module.exports = router; 