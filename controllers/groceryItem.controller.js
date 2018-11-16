const GroceryItem = require('./../models/GroceryItem.model');
const mongoose = require('mongoose');

exports.post = (req, res, next) => {
	GroceryItem.findOne({'name': req.body.name }).then(item => {
		if(item) {
			return res.status(401).send({
				message: "Item with name already exist."
			})
		}
		if(!req.body.name) {
			return res.status(400).send({
				message: "Item name cannot be empty"
			});
		}

		const groceryItem = new GroceryItem({
			name: req.body.name,
			isBought: req.body.isBought

		});
		// Save groceryItem in the dababase
		groceryItem.save()
			.then(data => {
				res.send(data);
			}).catch(err => {
				res.status(500).send({
					message: err.message || "Some error occurred while adding Item."
				});
			});
	}).catch(err => {
		return res.status(500).send({
     message: "Some Error occurred while adding item"
    });
	})
};

exports.update = (req, res) => {
	if (!req.body.isBought) {
		return res.status(400).send({
			message: "Item isBought can not be empty"
		})
	}
	GroceryItem.findByIdAndUpdate(req.params.itemId, {
		isBought: req.body.isBought
	}, {new: true})
	.then(item => {
		if (!item) {
			return res.status(404).send({
				message: "Note not found with id " + req.params.itemId
			})
		}
		res.send(item)
	}).catch(err => {
		if(err.kind === 'ObjectId') {
			return res.status(404).send({
       message: "Item not found with id " + req.params.itemId
      });
		}
		return res.status(500).send({
     message: "Error updating note with id " + req.params.itemId
    });
	})
}

exports.findAll = (req, res, next) => {
	GroceryItem.find()
		.then(groceryItems => {
			res.send(groceryItems);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving grocery Items."
			});
		});
};

exports.delete = (req, res, next) => {
	console.log("req", req.params.itemId);
	GroceryItem.findByIdAndRemove(req.params.itemId)
	.then(item => {
		if (!item) {
			return res.status(404).send({
				message: "Item not found with id" + req.params.itemId
			})
		}
		res.send({
			message: "Item deleted Successfully"
		})
	}).catch(err => {
		if (err.kind === 'ObjectId' || err.name === 'NotFound')  {
			return res.status(404).send({
				message: "Item not found with id" + req.params.itemId
			})
		}
		return res.status(500).send({
			message: "Could not delete note with id" + req.params.itemId
		})
	})
};
