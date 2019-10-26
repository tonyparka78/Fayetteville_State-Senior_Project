var express = require('express')
var app = express()


app.get('/', function(req, res){
    if (req.session.username) {
    res.render('workout/home', {title: 'Home page before login'})
    }
    else{
        res.render('workout/index', {title: 'Home page before login'})
    }
})
app.get('/home', function(req, res){
    if (req.session.username) {
    res.render('workout/home', {title: 'Home page after login'})
    }
    else{
        req.flash('error', 'you dont Have persmission') 
        res.redirect('/')
    }
})

module.exports = app