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
// Registration User
app.get('/', function(req, res, next){
    res.render('workout/register', {
        title: 'Registration User'
    })

})
// INSERT USER TO DB
app.post('/', function(req, res, next){


    var user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }

    req.getConnection(function(error, conn){
        pool.query("INSERT INTO users SET ?", user, function(err, result){
            if(err){
                req.flash('error', err)
                res.redirect('/register')
            } else {
                req.flash('success', 'account created successfully')
                res.redirect('/login')
            }
        })
    }) 


})

module.exports = app