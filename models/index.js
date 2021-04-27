const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo-api', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");