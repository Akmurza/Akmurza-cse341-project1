const mongodb = require('../model/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('contacts').find();
    const contacts = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingle = async (req, res) => {
  const { id } = req.query;

  if (!id || !ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: 'A valid id query parameter is required' });
  }

  try {
    const contactId = new ObjectId(id);
    const contact = await mongodb
      .getDb()
      .collection('contacts')
      .findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
};
