const router = require('express').Router();
let Purchase = require('../../models/Expenses/expensesModel');
// let moment = require('moment');

//all purchases
router.route('/').get((req, res) => {
	Purchase.find()
		.then((expenses) => res.json(expenses))
		.catch((err) => res.status(400).json('ERROR: ' + err));
});

//add purchase
router.post('/add', (req, res) => {
	const newPurchase = new Purchase({
		dateExpense: req.body.dateExpense,
		companyName: req.body.companyName,
		totalExpense: req.body.totalExpense,
		gst: req.body.gst,
	});

	try {
		newPurchase.save();
		console.log('router new Expense: ' + newPurchase);
		// res.json({ "router new sales: ": newSales })
		res.json({ success: true });
	} catch (err) {
		res.status(400).send(err);
	}
});

router.get('/sorted', (req, res) => {
	Purchase.find({})
		.sort({ datePurchase: 'ascending' })
		.exec(function (err, docs) {
			res.json(docs);
		});
});

module.exports = router;
