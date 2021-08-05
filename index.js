const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const greetings = require('./greetings');

const app = express()
const greet = greetings()
const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});
app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', function(req, res){
    res.render('index',{
       // nameGreeted:greet.getNames()
        });
   
});

app.post('/', function (req, res) {
    const name = req.body.userName;
    const language = req.body.language

    const message = greet.language(name, language);

    console.log({message});

    res.render('index', {
        message
    });
    

});


let PORT = process.env.PORT || 3007;

app.listen(PORT, function(){
console.log("app started", PORT)
});