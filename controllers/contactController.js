const Contact = require("../models/contactModel");

const getContact = async (req, res) => {
  try {
    // Ensure req.user is defined and has an id property
    if (!req.user || !req.user.id) {
      res.status(401);
      throw new Error("User ID not found in request");
    }

    // Fetch contacts for the user
    const contacts = await Contact.find({ user_id: req.user.id });

    // Send the contacts in response
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
};

const createContact = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const contact = await Contact.create({ name, email, phone,user_id:req.user.id }); 
    res.status(201).json(contact); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create contact' }); // Handle errors
  }
};

const getUserbyid = async (req, res) => {
  const contact=await Contact.findById(req.params.id);


  if(!contact){
      res.status(400);
      throw new Error("contact not found");
  }
    res.status(500).json(contact);
  };

const deleteContact = async (req, res) => {
  const contact=await Contact.findById(req.params.id);
  if(!contact){
    res.status(400);
    throw new Error("contact not found");
}
await contact.deleteOne();
res.json(contact);
};

const updateContact = async (req, res) => {
  const contact= await Contact.findById(req.params.id);
  if(!contact){
    res.status(400);
    throw new Error("no contact");
    }
   const updateContact=await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
   );
   res.status(200).json(updateContact);
};

module.exports = { getContact, createContact, getUserbyid, deleteContact, updateContact };
