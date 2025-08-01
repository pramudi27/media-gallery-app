const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { protect, adminOnly } = require('../middlewares/auth');

// User: submit a message
router.post('/', protect, contactController.createContact);

// User: get their messages
router.get('/my-messages', protect, contactController.getMyMessages);

// User: edit/delete own message
router.put('/:id', protect, contactController.updateContact);
router.delete('/:id', protect, contactController.deleteContact);

// Admin: get all messages, delete any
router.get('/admin/all', protect, adminOnly, contactController.getAllContacts);
router.delete('/admin/:id', protect, adminOnly, contactController.adminDeleteContact);

module.exports = router;
