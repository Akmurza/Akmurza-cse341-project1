const mongodb = require('../model/database');
const { ObjectId } = require('mongodb');

const hasAllFields = (body) => {
  if (!body) {
    return false;
  }

  if (!body.firstName || !body.lastName || !body.email || !body.favoriteColor || !body.birthday) {
    return false;
  }

  return true;
};

const makeContactFromBody = (body) => {
  return {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    favoriteColor: body.favoriteColor,
    birthday: body.birthday,
  };
};

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('contacts').find();
    const contacts = await result.toArray();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingle = async (req, res) => {
  const id = req.params.id;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Please send valid contact id in URL' });
  }

  try {
    const contactId = new ObjectId(id);
    const contact = await mongodb
      .getDb()
      .collection('contacts')
      .findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: 'Contact is not found' });
    }

    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createContact = async (req, res) => {
  if (!hasAllFields(req.body)) {
    return res.status(400).json({
      message: 'All fields are required: first name, last name, email, favorite color, birthday',
    });
  }

  const contact = makeContactFromBody(req.body);

  try {
    const response = await mongodb.getDb().collection('contacts').insertOne(contact);

    if (!response.acknowledged) {
      return res.status(500).json({ message: 'Could not create contact' });
    }

    return res.status(201).json({ id: response.insertedId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateContact = async (req, res) => {
  const id = req.params.id;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Please send valid contact id in URL' });
  }

  if (!hasAllFields(req.body)) {
    return res.status(400).json({
      message: 'All fields are required: first name, last name, email, favorite color, birthday',
    });
  }

  const contact = makeContactFromBody(req.body);

  try {
    const response = await mongodb
      .getDb()
      .collection('contacts')
      .updateOne({ _id: new ObjectId(id) }, { $set: contact });

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact is not found' });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  const id = req.params.id;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Please send valid contact id in URL' });
  }

  try {
    const response = await mongodb
      .getDb()
      .collection('contacts')
      .deleteOne({ _id: new ObjectId(id) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact is not found' });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
