'use strict';
const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const greetings = require('./greetings');
const Routes = require('./routes/greetings-routes')


const pg = require("pg");
const Pool = pg.Pool;
// should we use a SSL connection
let useSSL = false;

let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/user';


const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const app = express()
const greet = greetings(pool)
const greetingsRoutes = Routes(greet)

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

app.get('/', greetingsRoutes.display);
app.post('/greet',greetingsRoutes.greetUser );
app.get('/listName',greetingsRoutes.showAll);
app.get('/listName/:userName',greetingsRoutes.summarySentence);
app.get('/resetbtn',greetingsRoutes.refresh);

let PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
    console.log("app started", PORT)
});