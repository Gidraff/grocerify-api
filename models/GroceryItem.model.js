const mongoose = require('mongoose');

const GroceryItemSchema = new mongoose.Schema(
	{

		name: { type: String, required: true},
		isBought: {type: Boolean, required: true}
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('GroceryItem', GroceryItemSchema);
