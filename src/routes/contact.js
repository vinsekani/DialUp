const express = require("express");
const { model } = require("mongoose");
const Contact = require("../models/contact");
const contact = require("../models/contact");
const { addContact } = require("../controllers/contact");
const { getAllContacts } = require("../controllers/contact");
const { singleContact } = require("../controllers/contact");
const { deleteContact } = require("../controllers/contact");
const { updateContact } = require("../controllers/contact");

const { Router } = express;
const router = Router();

router.post("/new", addContact);

router.get("/", getAllContacts);

router.get("/:id", singleContact);

router.delete("/:id", deleteContact);

router.patch("/:id", updateContact);

module.exports = router;
