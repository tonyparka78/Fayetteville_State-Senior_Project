/* The first two lines require() (import) the express
module and create an Express application. The app object
conventionally denotes the Express application. Create it
by calling the top-level express() function exported by the
 Express module*/
var express = require('express')
var app = express()

/* Imports MySQL. Node.js can use this module to manipulate
the MySQL database */
var mysql = require('mysql')

/* Imports express-connection module. Connect/Express
middleware provides a consistent API for MySQL connections
during request/response life cycle. */
var myConnection = require('express-myconnection')


/*  Load the config.js file/module and its values */
var config = require('./config')


/* Imports the express-session module.
When implemented, every user of your API or website
will be assigned a unique session, and this allows
you to store the user state.*/
var session = require('express-session');


/*  Each app.use() is called everytime a request
is sent to the server. Added to all paths or globally.
These lines of code uses the express.static built-in
middleware function in Express to serve static files
such as images, CSS files, and JavaScript files  */
app.use('*/css',express.static('public/css'));
app.use('*/assets',express.static('public/assets'));
app.use('*/js',express.static('public/js'));


/* Initializes express-session to allow us track the logged-in user across sessions. Secret is the only required parameter, but there are many more you can use. It should be a randomly unique string for your application.*/
app.use(session({ secret: 'keyboard cat'}));


/* Creates a object dbOptions. This object use the config import
to create a connection to the database.
Use the username and password from your MySQL database. */
var dbOptions = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.db,
}


/* Creates pool of connections. Connection is auto
release when response ends. */
app.use(myConnection(mysql, dbOptions, 'pool'))


/* Tells Express to use the ejs templating engine and
to use the views folder holding the webpages.*/
app.set('view engine', 'ejs')


/* Require files from routes folder. */
var index = require('./routes/index')
var login = require('./routes/user')
var faq = require('./routes/faq')
var contact = require('./routes/contact')
var register = require('./routes/register')
var workout = require('./routes/workout')
var power = require('./routes/power-lifting')
var body = require('./routes/body-building')
var cardio = require('./routes/cardio')
var account = require('./routes/account')


/* Imports body-parser module. Parse incoming request
bodies in a middleware before your handlers, available
under the req.body property. Adds a JSON and
URL-encoded parser as a top-level middleware, which will
parse the bodies of all incoming requests. */
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true})) // to support URL-encoded bodies
app.use(bodyParser.json())
/* Imports method-override module. Method-override allows one to specify a custom
 function to be called during the middleware execution. In this custom function we
 will inspect the request body, req.body, for the presence of the desired token, _method
 in this case, and return its value to the middleware that will in turn override the
 request method. Parsing, syntax analysis, or syntactic analysis is the process of
 analysing a string of symbols, either in natural language, computer languages or
 data structures, conforming to the rules of a formal grammar. The term parsing comes
 from Latin pars, meaning part.*/
var methodOverride = require('method-override')
app.use(methodOverride(function(req, res){
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        var method = req.body._method
        delete req.body._method
        return method
    }
}))


/* Imports the express-flash module. Flash is an extension of
connect-flash with the ability to define a flash message
and render it without redirecting the request.    */
var flash = require('express-flash')
/* Imports the cookie-parser module. Cookies are simple,
small files/data that are sent to client with a server request
and stored on the client side. Every time the user loads the
website back, this cookie is sent with the request. This helps us
keep track of the user’s actions. Cookie-parser is a middleware
which parses cookies attached to the client request object. */
var cookieParser = require('cookie-parser')
var session = require('express-session')
app.use(cookieParser('keyboard1'))
app.use(session({
    secret: 'keyboard1',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:60000 }
}))
/* Call the flash function right after setting up session
and cookie parser. */
app.use(flash())


/*  Mounts route at the path. */
app.use('/', index)
app.use('/login', login)
app.use('/faq', faq)
app.use('/contact', contact)
app.use('/register', register)
app.use('/workout', workout)
app.use('/power-lifting',power)
app.use('/body-building',body)
app.use('/cardio',cardio)
app.use('/account',account)

app.listen(3000, function(){
    console.log("Server port: 3000")
})
