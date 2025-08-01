const Contact = require('../models/Contact');

// Submit new message
exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({
      name,
      email,
      message,
      userId: req.user ? req.user._id : null,
    });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get logged-in user's messages
exports.getMyMessages = async (req, res) => {
  try {
    const messages = await Contact.find({ userId: req.user._id });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit own message
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Message not found' });
    if (contact.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    contact.message = req.body.message || contact.message;
    await contact.save();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete own message
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Message not found' });

    // Check if userId exists to avoid a TypeError
    if (!contact.userId || contact.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Use findByIdAndDelete for reliability
    await Contact.findByIdAndDelete(req.params.id);

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error("Delete contact error:", err); // Log for debugging
    res.status(500).json({ message: err.message });
  }
};

// Admin: Get all messages
exports.getAllContacts = async (req, res) => {
  try {
    const messages = await Contact.find().populate('userId', 'name email');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Delete any message
exports.adminDeleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
