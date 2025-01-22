const Contact = require("../models/contact");

const addContact = async (req, res) => {
  //   console.log("new contact");
  try {
    const { name, phone, email, photo, category, company } = req.body;
    const contact = await Contact.findOne({ phone });
    console.log(contact);
    if (contact) {
      return res.status(400).json({ mesage: "Contact alredy exists" });
    } else {
      const newContact = new Contact({
        name,
        phone,
        email,
        photo,
        category,
        company,
      });
      const savedContact = await newContact.save();
      return res.status(201).json(savedContact);
    }
  } catch (error) {
    res.status(500).json({ "message": error });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ "message": error });
  }
};

const singleContact = async (req, res) => {
  try {
    const { id } = req.params;
    // const contact = await Contact.findOne({_id:id})
    const contacts = await Contact.findById(id);
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ "message": error });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contacts = await Contact.findByIdAndDelete(id);
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ "message": error });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const contacts = await Contact.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ "message": error });
  }
};

module.exports = {
  addContact,
  getAllContacts,
  singleContact,
  deleteContact,
  updateContact,
};
