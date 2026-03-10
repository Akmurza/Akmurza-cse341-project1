const router = require('express').Router();
const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);
router.get('/single', contactsController.getSingleOne);

module.exports = router;
