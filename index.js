const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session')
const flash = require('express-flash');
const greetings = require('./greetings');

const app = express()
const greet = greetings()
const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});
// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "Error messages",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());
app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', function (req, res) {
    
 res.render('index', {
   
    });
   
});

app.post('/', function (req, res) {
    var message = ""
    const name = req.body.userName;
    const language = req.body.language
   if(name&&language){
    message = greet.language(name, language);
    
    console.log({ message });
   }
    else {
        req.flash('error', 'Please enter your name first');
        }
        res.render('index', {
            message,
            count: greet.counter()
        });
     

});
app.get('/listName', function (req, res) {
    res.render('listName', { listName: greet.getNames() })

});

app.get('/listName/:userName', function (req, res) {
    const name = req.params.userName
    const listOfNames = greet.getNames()
    res.render('counter', {
        personsName: name,
        personsCounter: listOfNames[name],
        personCount: listOfNames[name]>1


    });

});
// app.get('/', function (req, res) {
//     const name = req.body.userName;
//     const language = req.body.language
   
//     res.redirect('/');
//     if (name !== "" && language===undefined ) {
//     req.flash('error', 'Please choose a language');
//     }
//     if (name == "" &&language===undefined) {
//     req.flash('error', 'Please enter your name and choose language');   
//     }

// });

let PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
    console.log("app started", PORT)
});