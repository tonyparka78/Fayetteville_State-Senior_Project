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
// workout Page
app.get('/', function(req, res, next){
    if(req.session.username){
        res.render('workout/workout', {
            title: 'workout Page',
        })
    }
    else{
        req.flash('error', 'you dont Have persmission')
        res.redirect('/')
    }
})
// list Exercice
app.get('/exercise', function(req, res, next){
    if(req.session.username){
        req.getConnection(function(error, conn){
            pool.query("SELECT * FROM exercise where username = '" + req.session.username +"'", function(err, rows, fields){
                if(err){
                    req.flash('error', err)
                    res.render('workout/workout', {
                        title: 'workout Page',
                        data: ''
                    })
                } else {
                    res.render('workout/exercise', {
                        title: 'Exercise List',
                        data: rows
                    })
                }
            })
        })
    }
    else{
        req.flash('error', 'you dont Have persmission')
        res.redirect('/')
    }
})
// INSERT Exercice TO DB
app.post('/exercise/add', function(req, res, next){
    if(req.session.username){
    var exercise = {
        username: req.session.username,
        name: req.body.name,
        type: req.body.type
    }
    req.getConnection(function(error, conn){
        pool.query("INSERT INTO exercise SET ?", exercise, function(err, result){
            if(err){
                req.flash('error', err)
                res.redirect('/workout')
            } else {
                req.flash('success', 'exercise added successfully')
                res.redirect('/workout/exercise')
            }
        })
    })
}
else{
    req.flash('error', 'you dont Have persmission')
    res.redirect('/')
}
})
// UPDATE AN EXERCICE
app.post('/exercise/edit/(:id)', function(req, res, next){
    var exercise = {
        username: req.session.username,
        name: req.body.name,
        type: req.body.type
    }

    req.getConnection(function(error, conn){
        pool.query("UPDATE exercise SET ? WHERE id = " + req.params.id, exercise, function(err, result){
            if(err){
                req.flash('error', err)
                res.redirect('/workout')
            } else {
                req.getConnection(function(error, conn){
                    pool.query("SELECT * FROM exercise where username = '" + req.session.username +"'", function(err, rows, fields){
                        if(err){
                            req.flash('error', err)
                            res.render('workout/workout', {
                                title: 'workout Page',
                                data: ''
                            })
                        } else {
                            res.render('workout/exercise', {
                                title: 'Exercise List',
                                data: rows
                            })
                        }
                    })
                })
            }
        })
    })
})
// DELETE AN EXERCICE
app.get('/exercise/delete/(:id)', function(req, res, next){
    var item = {id: req.params.id}
    req.getConnection(function(error, conn){
        pool.query("DELETE FROM exercise WHERE id = " + req.params.id, item, function(err, rows, fields){
            if(err){
                req.flash('error', err)
                res.render('workout/exercise', {
                    title: 'Exercise List',
                    data: ''
                })
            } else {
                req.flash('delete', 'exercise Deleted!')
                pool.query("SELECT * FROM exercise where username = '" + req.session.username +"'", function(err, rows, fields){
                    if(err){
                        req.flash('error', err)
                        res.render('workout/workout', {
                            title: 'workout Page',
                            data: ''
                        })
                    } else {
                        res.render('workout/exercise', {
                            title: 'Exercise List',
                            data: rows
                        })
                    }
                })
            }
        })
    })
})
// list Category
app.get('/category', function(req, res, next){
    if(req.session.username){
        req.getConnection(function(error, conn){
            pool.query("SELECT * FROM category where username = '" + req.session.username +"'", function(err, rows, fields){
                if(err){
                    req.flash('error', err)
                    res.render('workout/workout', {
                        title: 'workout Page',
                        data: ''
                    })
                } else {
                    res.render('workout/category', {
                        title: 'Category List',
                        data: rows
                    })
                }
            })
        })
    }
    else{
        req.flash('error', 'you dont Have persmission')
        res.redirect('/')
    }
})
// INSERT Category To DB
app.post('/category/add', function(req, res, next){
    if(req.session.username){
    var category = {
        username: req.session.username,
        name: req.body.name,
    }
    req.getConnection(function(error, conn){
        pool.query("INSERT INTO category SET ?", category, function(err, result){
            if(err){
                req.flash('error', err)
                res.redirect('/workout')
            } else {
                req.flash('success', 'category added successfully')
                res.redirect('/workout/category')
            }
        })
    })
}
else{
    req.flash('error', 'you dont Have persmission')
    res.redirect('/')
}
})
// UPDATE  CATEGORY
app.post('/category/edit/(:id)', function(req, res, next){
    var category = {
        username: req.session.username,
        name: req.body.name
        }

    req.getConnection(function(error, conn){
        pool.query("UPDATE category SET ? WHERE id = " + req.params.id, category, function(err, result){
            if(err){
                req.flash('error', err)
                res.redirect('/workout')
            } else {
                req.getConnection(function(error, conn){
                    pool.query("SELECT * FROM category where username = '" + req.session.username +"'", function(err, rows, fields){
                        if(err){
                            req.flash('error', err)
                            res.render('workout/workout', {
                                title: 'workout Page',
                                data: ''
                            })
                        } else {
                            res.render('workout/category', {
                                title: 'Category List',
                                data: rows
                            })
                        }
                    })
                })
            }
        })
    })
})
// DELETE A Category
app.get('/category/delete/(:id)', function(req, res, next){
    var item = {id: req.params.id}
    req.getConnection(function(error, conn){
        pool.query("DELETE FROM category WHERE id = " + req.params.id, item, function(err, rows, fields){
            if(err){
                req.flash('error', err)
                res.render('workout/category', {
                    title: 'Category List',
                    data: ''
                })
            } else {
                req.flash('delet', 'category Deleted!')
                pool.query("SELECT * FROM category where username = '" + req.session.username +"'", function(err, rows, fields){
                    if(err){
                        req.flash('error', err)
                        res.render('workout/workout', {
                            title: 'workout Page',
                            data: ''
                        })
                    } else {
                        res.render('workout/category', {
                            title: 'Category List',
                            data: rows
                        })
                    }
                })
            }
        })
    })
})
// list Routine
app.get('/routine', function(req, res, next){
    if(req.session.username){
        req.getConnection(function(error, conn){
            pool.query("SELECT * FROM routine where username = '" + req.session.username +"'", function(err, rows, fields){
                if(err){
                    req.flash('error', err)
                    res.render('workout/workout', {
                        title: 'workout Page',
                        data: ''
                    })
                } else {
                    res.render('workout/routine', {
                        title: 'Routine List',
                        data: rows
                    })
                }
            })
        })
    }
    else{
        req.flash('error', 'you dont Have persmission')
        res.redirect('/')
    }
})
// INSERT Routine To DB
app.post('/routine/add', function(req, res, next){
    if(req.session.username){
    var routine = {
        username: req.session.username,
        name: req.body.name,
    }
    req.getConnection(function(error, conn){
        pool.query("INSERT INTO routine SET ?", routine, function(err, result){
            if(err){
                req.flash('error', err)
                res.redirect('/workout')
            } else {
                req.flash('success', 'routine added successfully')
                res.redirect('/workout/routine')
            }
        })
    })
}
else{
    req.flash('error', 'you dont Have persmission')
    res.redirect('/')
}
})
// UPDATE ROUTINE
app.post('/routine/edit/(:id)', function(req, res, next){
    var routine = {
        username: req.session.username,
        name: req.body.name
        }

    req.getConnection(function(error, conn){
        pool.query("UPDATE routine SET ? WHERE id = " + req.params.id, routine, function(err, result){
            if(err){
                req.flash('error', err)
                res.redirect('/workout')
            } else {
                req.getConnection(function(error, conn){
                    pool.query("SELECT * FROM routine where username = '" + req.session.username +"'", function(err, rows, fields){
                        if(err){
                            req.flash('error', err)
                            res.render('workout/workout', {
                                title: 'workout Page',
                                data: ''
                            })
                        } else {
                            res.render('workout/routine', {
                                title: 'Routine List',
                                data: rows
                            })
                        }
                    })
                })
            }
        })
    })
})
// DELETE AN Routine
app.get('/routine/delete/(:id)', function(req, res, next){
    var item = {id: req.params.id}
    req.getConnection(function(error, conn){
        pool.query("DELETE FROM routine WHERE id = " + req.params.id, item, function(err, rows, fields){
            if(err){
                req.flash('error', err)
                res.render('workout/routine', {
                    title: 'Routine List',
                    data: ''
                })
            } else {
                req.flash('delet', 'routine Deleted!')
                pool.query("SELECT * FROM routine where username = '" + req.session.username +"'", function(err, rows, fields){
                    if(err){
                        req.flash('error', err)
                        res.render('workout/workout', {
                            title: 'workout Page',
                            data: ''
                        })
                    } else {
                        res.render('workout/routine', {
                            title: 'Routine List',
                            data: rows
                        })
                    }
                })
            }
        })
    })
})

// Tools
app.get('/tools', function(req, res, next){
    if(req.session.username){
        res.render('workout/tools', {
            title: 'Tools'
        })
    }
    else{
        req.flash('error', 'you dont Have persmission')
        res.redirect('/')
    }
})
// Weight
app.get('/weight', function(req, res, next){
    if(req.session.username){
        res.render('workout/tools-new', {
            title: 'Weight'
        })
    }
    else{
        req.flash('error', 'you dont Have persmission')
        res.redirect('/')
    }
})
// Weight add to DB
app.post('/weight/add', function(req, res, next){
    if(req.session.username){
        var weight = {
            username: req.session.username,
            weight: req.body.weight,
            Date: req.body.date,
            time: req.body.time,
            Notes: req.body.note,
        }
        req.getConnection(function(error, conn){
            pool.query("INSERT INTO weight SET ?", weight, function(err, result){
                if(err){
                    req.flash('error', err)
                    res.redirect('/workout')
                } else {
                    req.flash('success', 'weight added successfully')
                    req.getConnection(function(error, conn){
                        pool.query("SELECT * FROM weight where username = '" + req.session.username +"'", function(err, rows, fields){
                            if(err){
                                req.flash('error', err)
                                res.render('workout/workout', {
                                    title: 'workout Page',
                                    data: ''
                                })
                            } else {
                                res.render('workout/tools-history', {
                                    title: 'History List',
                                    data: rows
                                })
                            }
                        })
                    })
                }
            })
        })
    }
    else{
        req.flash('error', 'you dont Have persmission')
        res.redirect('/')
    }
})
// DELETE A Weight
app.get('/weight/delete/(:id)', function(req, res, next){
    var item = {id: req.params.id}
    req.getConnection(function(error, conn){
        pool.query("DELETE FROM weight WHERE id = " + req.params.id, item, function(err, rows, fields){
            if(err){
                req.flash('error', err)
                res.render('workout/weight', {
                    title: 'Weight List',
                    data: ''
                })
            } else {
                req.flash('delet', 'Weight Deleted!')
                pool.query("SELECT * FROM weight where username = '" + req.session.username +"'", function(err, rows, fields){
                    if(err){
                        req.flash('error', err)
                        res.render('workout/weight', {
                            title: 'Weight Page',
                            data: ''
                        })
                    } else {
                        req.getConnection(function(error, conn){
                            pool.query("SELECT * FROM weight where username = '" + req.session.username +"'", function(err, rows, fields){
                                if(err){
                                    req.flash('error', err)
                                    res.render('workout/workout', {
                                        title: 'workout Page',
                                        data: ''
                                    })
                                } else {
                                    res.render('workout/tools-history', {
                                        title: 'History List',
                                        data: rows
                                    })
                                }
                            })
                        })
                    }
                })
            }
        })
    })
})
// History
app.get('/history', function(req, res, next){
    if(req.session.username){
        req.getConnection(function(error, conn){
            pool.query("SELECT * FROM weight where username = '" + req.session.username +"'", function(err, rows, fields){
                if(err){
                    req.flash('error', err)
                    res.render('workout/workout', {
                        title: 'workout Page',
                        data: ''
                    })
                } else {
                    res.render('workout/tools-history', {
                        title: 'History List',
                        data: rows
                    })
                }
            })
        })
    }
    else{
        req.flash('error', 'you dont Have persmission')
        res.redirect('/')
    }
})
// Graph
app.get('/graph', function(req, res, next){
    if(req.session.username){
        res.render('workout/tools-graph', {
            title: 'Graph'
        })
    }
    else{
        req.flash('error', 'you dont Have persmission')
        res.redirect('/')
    }
})
module.exports = app
