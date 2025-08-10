const contactService = require("../services/contact.service");
const contactModel = require("../models/contact.models");
const { validationResult } = require("express-validator");

module.exports.createContact = async (req, res) => {
  console.log("Incoming request body:", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const contactData = req.body;
    const newContact = await contactService.createContact(contactData);

    console.log("Contact saved:", newContact);
    return res.status(201).json({
      message: "Contact request created successfully",
      contact: {
        id: newContact._id,
        name: newContact.name,
        email: newContact.email,
        phone: newContact.phone,
        company_name: newContact.company_name,
        country: newContact.country,
        job_title: newContact.job_title,
        messages: newContact.messages,
        created_at: newContact.created_at,
      },
    });
  } catch (error) {
    console.error("Error in service:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

module.exports.getContactByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const contact = await contactService.getContactByEmail(email);
    return res.status(200).json({ message: "Contact retrieved successfully", contact });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports.getContactByPhone = async (req, res) => {
  const { phone } = req.params;
  try {
    const contact = await contactService.getContactByPhone(phone);
    return res.status(200).json({ message: "Contact retrieved successfully", contact });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};


module.exports.getContactById = async (req, res) => {
  const { id } = req.params; 
  try {
    const contact = await contactService.getContactById(id);
    return res.status(200).json({ message: "Contact retrieved successfully", contact });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};


module.exports.getContactByName = async (req, res) => {
  const { name } = req.params;
  try {
    const contacts = await contactService.getContactsByName(name);
    if (!contacts.length) {
      return res.status(404).json({ error: "No contacts found with this name" });
    }
    return res.status(200).json({ message: "Contacts retrieved successfully", contacts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getContactByCompanyName = async (req, res) => {
  const { company_name } = req.params;
  try {
    const contacts = await contactService.getContactByCompanyName(company_name);
    if (!contacts.length) {
      return res.status(404).json({ error: "No contacts found for this company" });
    }
    return res.status(200).json({ message: "Contacts retrieved successfully", contacts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getContactByCountry = async (req, res) => {
  const { country } = req.params;
  try {
    const contacts = await contactService.getContactsByCountry(country);
    if (!contacts.length) {
      return res.status(404).json({ error: "No contacts found for this country" });
    }
    return res.status(200).json({ message: "Contacts retrieved successfully", contacts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getContactByJobTitle = async (req, res) => {
  const { job_title } = req.params;
  try {
    const contacts = await contactService.getContactByJobTitle(job_title);
    if (!contacts.length) {
      return res.status(404).json({ error: "No contacts found for this job title" });
    }
    return res.status(200).json({ message: "Contacts retrieved successfully", contacts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await contactService.getAllContacts();
    return res.status(200).json({
      message: "Contacts retrieved successfully",
      contacts,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const contactData = req.body;
  try {
    const updatedContact = await contactService.updateContact(id, contactData);
    return res.status(200).json({
      message: "Contact updated successfully",
      contact: updatedContact,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await contactService.deleteContact(id);
    return res.status(200).json({
      message: "Contact deleted successfully",
      contact: deletedContact,
    });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}   

module.exports.searchContacts = async (req, res) => {
  const { query } = req.query;
  try {
    const contacts = await contactService.searchContacts(query);
    return res.status(200).json({
      message: "Contacts searched successfully",
      contacts,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports.getContactCount = async (req, res) => {
  try {
    const count = await contactService.getContactCount();
    return res.status(200).json({
      message: "Contact count retrieved successfully",
      count,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports.getRecentContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find().sort({ created_at: -1 }).limit(10); 
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ error: "No recent contacts found" });
    }
    return res.status(200).json({
      message: "Recent contacts retrieved successfully",
      contacts,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getContactStats = async (req, res) => {
  try {
    const stats = await contactService.getContactStats();
    return res.status(200).json({
      message: "Contact statistics retrieved successfully",
      stats,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}









