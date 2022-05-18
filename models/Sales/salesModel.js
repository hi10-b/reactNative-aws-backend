const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salesSchema = new Schema({
	dateSales: {
		type: String,
	},
	totalSales: {
		type: Number,
	},
	epaySales: {
		type: Number,
	},
	eftposSales: {
		type: Number,
	},
	gst: {
		type: Number,
	},
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
