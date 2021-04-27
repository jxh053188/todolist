const bodyParser = require('body-parser');
const express = require ('express');
app = express();


const todoRoutes = require('./routes/todos')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.send('HI THERE FROM EXPRESS')
});

app.use('/api/todos', todoRoutes);

app.listen(3000, function(){
    console.log('App is running on port 3000')
});