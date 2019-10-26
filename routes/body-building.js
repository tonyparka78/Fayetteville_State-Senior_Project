var express = require('express')
var app = express()

app.get('/', function(req, res){
    if (req.session.username) {
    res.render('workout/body-building', {title: 'body-building page'})
    }
    else{
        req.flash('error', 'you dont Have persmission') 
        res.redirect('/')
    }
})

module.exports = app