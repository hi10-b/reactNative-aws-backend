const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expensesSchema = new Schema({
	dateExpense: {
		type: String,
	},
	companyName: {
		type: String,
		// required
	},
	totalExpense: {
		type: Number,
		// required
	},
	gst: {
		type: Number,
	},
});

const Purchase = mongoose.model('Expenses', expensesSchema);

module.exports = Purchase;
