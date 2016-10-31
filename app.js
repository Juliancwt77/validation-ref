var express = require('express'),
  session = require('express-session'),
  ejsLayout = require('express-ejs-layouts'),
  app = express(),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  override = require('method-override'),
  flash = require('connect-flash')
  MongoStore = require('connect-mongo')(session)

app.use(morgan('dev'))

// db set-up
var databaseURL = 'mongodb://localhost/validation'
mongoose.connect(databaseURL)

// model set-up
var User = require('./models/user')

// view set-up
app.set('view engine', 'ejs')
app.use(ejsLayout)

// flash set-up
app.use(session({
  secret: 'SUPERCALAFRAGILISTICEXPIALIDOCIOUS',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: databaseURL,
    autoReconnect: true
  })
}))
app.use(flash())

// form set-up
app.use(bodyParser.urlencoded({ extended: true }))

app.route('/')
    .get(function (req, res) {
      res.render('index', {
        'errors': req.flash('errorMessage')
      })
    })
    .post(function (req, res) {
      // res.send(req.body)

      User.create(req.body.user, function(err, newUser) {
        if(err) {
          req.flash('errorMessage', err.errors)
          return res.redirect('back')
        }

        res.redirect('/users')
      })
    })

app.route('/users')
    .get(function(req, res) {
      User.find({}, function(err, allUser) {
        res.send(allUser)
      })
    })

app.listen(3000)
