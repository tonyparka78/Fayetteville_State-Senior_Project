var express = require('express')
var config = require('../config')

//Node.js can use this module to manipulate the MySQL database
var mysql = require('mysql')
var app = express()
var dbOptions = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.db,
}
var pool = mysql.createPool(dbOptions)

app.get('/', function(req, res){
    if (req.session.username) {

    var account = {
            username: req.session.username,
            email: req.session.email,
            password: req.session.password,
            id: req.session.id,
        }
    res.render('workout/account',
    {
        title: 'account page',
        data : account
    }

    )
    }
    else{
        req.flash('error', 'you dont Have persmission')
        res.redirect('/')
    }
})
app.post('/email', function(req, res){
    if (req.session.username) {
    var account = {
            username: req.session.username,
            email: req.body.email,
            password: req.session.password,
            id: req.session.id,
        }
        req.getConnection(function(error, conn){
            pool.query("UPDATE users SET ? WHERE id = " + req.session.ide, account, function(err, result){
                if(err){
                    req.flash('error', err)
                    res.redirect('/account')
                } else {
                    req.session.email = account.email;
                    res.render('workout/account',
                    {
                        title: 'account page',
                        data : account
                    })
                }
            })
        })
}
})
app.post('/password', function(req, res){
    if (req.session.username) {
    var account = {
            username: req.session.username,
            email: req.session.email,
            password: req.body.password,
            id: req.session.id,
        }
        if(req.body.oldpassword != req.session.password)
        {
            req.flash('error', 'the old password not correct')
            res.render('workout/account',
            {
                title: 'account page',
                data : account
            })
        }
        else
        {
        req.getConnection(function(error, conn){
            pool.query("UPDATE users SET ? WHERE id = " + req.session.ide, account, function(err, result){
                if(err){
                    req.flash('error', err)
                    res.redirect('/account')
                } else {
                    req.session.email = account.email;
                    res.render('workout/account',
                    {
                        title: 'account page',
                        data : account
                    })
                }
            })
        })
}}
})

module.exports = app
