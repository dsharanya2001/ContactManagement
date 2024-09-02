const express = require("express");
const router = express.Router();
const { getContact,createContact,getUserbyid,deleteContact,updateContact} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHnadler");


router.use(validateToken);
// Route to get all contacts
router.route("/").get(getContact);

// Route to create a new contact
router.route("/").post(createContact);
// Route to update a contact by ID
router.route("/:id").get(getUserbyid);

// Route to delete a contact by ID
router.route("/:id").delete(deleteContact);

// Route to get a specific contact by ID
router.route("/:id").put(updateContact);


module.exports = router;
