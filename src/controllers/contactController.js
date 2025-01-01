const { Contacts } = require('../models');

// Get all contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contacts.findAll({
      where: { is_active: true },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: error.message
    });
  }
};

// Get single contact by ID
const getContactById = async (req, res) => {
  try {
    const contact = await Contacts.findByPk(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact',
      error: error.message
    });
  }
};

// Create new contact
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required (name, email, subject, message)'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    const contact = await Contacts.create({
      name,
      email,
      subject,
      message,
      is_active: true
    });

    res.status(201).json({
      success: true,
      message: 'Contact message created successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create contact',
      error: error.message
    });
  }
};

// Update contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, subject, message, is_active } = req.body;

    const contact = await Contacts.findByPk(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // If email is being updated, validate format
    if (email && email !== contact.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }
    }

    await contact.update({
      name: name || contact.name,
      email: email || contact.email,
      subject: subject || contact.subject,
      message: message || contact.message,
      is_active: is_active !== undefined ? is_active : contact.is_active
    });

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact',
      error: error.message
    });
  }
};

// Delete contact (soft delete)
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contacts.findByPk(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Soft delete
    await contact.update({ is_active: false });

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: error.message
    });
  }
};

// Hard delete contact
const hardDeleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contacts.findByPk(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Permanently delete the contact
    await contact.destroy();

    res.status(200).json({
      success: true,
      message: 'Contact permanently deleted'
    });
  } catch (error) {
    console.error('Error permanently deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to permanently delete contact',
      error: error.message
    });
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  hardDeleteContact
};
