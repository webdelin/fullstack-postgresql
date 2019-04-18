const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const keys = require('./config/keys')

const app = express()

const db = new Sequelize(keys.dbUri)

db.authenticate()
.then(() => {
    console.log('PGSQL Connection successfully.');
})
.catch(err => {
    console.error('Unable to the database:', err);
})

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/storage', express.static('storage'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app
