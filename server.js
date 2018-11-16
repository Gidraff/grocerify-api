const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConfig = require('./config/database.config');
const bodyParser = require('body-parser');

const PORT = 8000;
const HOST = 'localhost';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.grocery.url, {
	useNewUrlParser: true
}).then(() => {
	console.log('Successfully connected to the database.');
}).catch(err => {
	console.log('could not connect to the database. Exiting now...', err);
});

app.get('/', (req, res, next) => {
	res.json({'Message': 'Welcome to Grocery API'});
});

require('./routes/groceryItem.route.js')(app);
app.listen(PORT, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});
