var express = require('express')
var mysql = require('mysql')
var app = express()
// Display page Login
app.get('/', function(req, res, next){
        if(req.session.username){
        req.flash('session', "connected")
        }
        res.render('workout/contact', {
            title: 'Contact page',
        })
})


module.exports = app