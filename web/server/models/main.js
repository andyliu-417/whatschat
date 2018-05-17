var mongoose = require('mongoose');
var config = require('../configs/config.json');

mongoose.connect(config.mongoDbUri);

// load models
require('./user');
require('./chat');

