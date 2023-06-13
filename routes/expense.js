const express = require('express');

const expenseController = require('../controllers/expense')
const userauthentication = require('../middleware/auth')

const router = express.Router();

router.post('/addexpense',userauthentication.authenticate,  expenseController.addexpense )

router.get('/getexpenses', userauthentication.authenticate,  expenseController.getexpenses )

router.delete('/deleteexpense/:expense.id', userauthentication.authenticate , expenseController.deleteexpense)


router.get('/download',  userauthentication.authenticate, expenseController.downloadExpenses)


router.get('/downloadfile',  userauthentication.authenticate, expenseController.downloadfile)


module.exports = router;