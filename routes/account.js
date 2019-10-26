var express = require('express')
var app = express()

app.get('/', function(req, res){
    if (req.session.username) {
    res.render('workout/account', {title: 'account page'})
    }
    else{
        req.flash('error', 'you dont Have persmission')
        res.redirect('/')
    }
})

module.exports = app
