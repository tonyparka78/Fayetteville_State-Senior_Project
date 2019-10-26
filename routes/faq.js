var express = require('express')
var app = express()

// Display page Login
app.get('/', function(req, res, next){
        if(req.session.username){
        req.flash('session', "connected")
        }
        res.render('workout/faq', {
            title: 'FAQ page',
        })
})


module.exports = app