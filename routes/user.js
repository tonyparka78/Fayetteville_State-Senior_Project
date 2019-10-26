var express = require('express')
var mysql = require('mysql')
var app = express()
var config = require('../config')
var dbOptions = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.db,
}
var pool = mysql.createPool(dbOptions)
// Display page Login
app.get('/', function(req, res, next){
    if (req.session.username) {
        res.redirect('/')
    }
    else{
    res.render('workout/login', {
        title: 'Login page',
        login: '',
        password: ''
    })
}
})
// Log out
app.get('/logout', function(req, res, next){
    req.session.username = null;
    res.redirect('/')
})
// Test if user can login or not
app.post('/', function(req, res, next){
    req.getConnection(function(error, conn){
        pool.query("SELECT * FROM users where username = '" + req.body.username +"' and password = '" + req.body.password +"'"  , function(err, rows, fields){
            if(err){
                req.flash('error', err)
                res.redirect('/login')
            } else {
                if(rows.length <= 0)
                {
                    req.flash('error', 'not found') 
                    res.redirect('/login')
                }
                else{
                    // Creat Session
                    req.session.views = 1;
                    req.session.username = req.body.username ;
                    req.flash('session', "connected")
                    res.redirect('/home')

            }
            }
        })
    })
})

module.exports = app