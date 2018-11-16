const groceryItem = require('./../controllers/GroceryItem.controller');

module.exports = (app) => {
	app.post('/groceries', groceryItem.post);
	app.get('/groceries', groceryItem.findAll);
	app.delete('/groceries/:itemId', groceryItem.delete);
	app.put('/groceries/:itemId', groceryItem.update);
};
