'use strict';
const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const greetings = require('./greetings');
//const Routs = require("./greetings-routes")


const pg = require("pg");
// const { Cookie } = require("express-session");
const Pool = pg.Pool;
// should we use a SSL connection
let useSSL = false;

let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/user';


const pool = new Pool({
    connectionString,
    ssl : {
        rejectUnauthorized : false
    }
  });

const app = express()
const greet = greetings(pool)
//const greetingsRoutes = Routs(greet)

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});
// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "Error messages",
    resave: false,
    saveUninitialized: true,
}));

// initialise the flash middleware
app.use(flash());
app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', async function (req, res) {
    const count = await greet.counter();

    res.render('index', {
        count

    });

});

app.post('/greet',  async function (req, res) {
    try {
        var message = ""
        const name = req.body.userName;
        const language = req.body.language
        if (name && language) {
            message = await greet.language(name, language); // add or update the counter and return a message : Hello, world!

            console.log({ message });
        } 
        if  (name == "" && language===undefined ){
            req.flash('error', 'Please enter your name and choose language')
        }
        if (name !== "" && language===undefined ) {
            
            req.flash('error','Please choose a language')   
            }

        else if (name =="" && language){
            req.flash('error', 'Please enter your name first');
        }

        

        const count = await greet.counter();
console.log(count)
        res.render('index', {
            message,
            count
        });
    }
    catch (error) {
        console.log(error);
    }
});
app.get('/listName', async function (req, res) {
    try {
        res.render('listName', { listName: await greet.getNames() })
    } catch (error) {
        console.log(error)
    }


});

app.get('/listName/:userName', async function (req, res) {
    try {
        const name = req.params.userName
        const listOfNames = await greet.getName(name)
        console.log(listOfNames);
        res.render('counter', {
            personsName: name,
            personsCounter: listOfNames.counter,
            personCount: listOfNames.counter > 1
        });
    } catch (error) {
        console.log(error)
    }
});
app.get('/resetbtn', async function (req, res) {
    await greet.restart()
    res.redirect('/')
});
let PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
    console.log("app started", PORT)
});