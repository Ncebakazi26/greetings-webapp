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
app.post('/', function(req, res){
    res.render('index',{
        message: "Molo Thabang"
        });
        console.log(req.body)
   
});


// app.post('/greeting',function(req,res){
//     greet.setName({
//         userName: req.body.userName
//     });
//     console.log(greet.getNames())
  
//     greet.language(req.body.language)
//     res.redirect('/');

// });


let PORT = process.env.PORT || 3007;

app.listen(PORT, function(){
console.log("app started", PORT)
});