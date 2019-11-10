var config = {
    database: {
        host: 'localhost',     // Database host
        user: 'project',         // Database username
        password: 'Admin2019!!',  // Database password
        port: 3306,            // Default MySQL port
        db: 'app'              // Database name
    },
    server: {
        host: 'localhost',

/* The module.exports or exports is a special object which is included in
every JS file in the Node.js application by default. module is a variable
that represents current module and exports is an object that will be exposed
as a module. So, whatever you assign to module.exports or exports, will be
exposed as a module.*/
module.exports = config
