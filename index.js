const express = require('express')
const morgan = require('morgan')
var cors = require('cors')
const app = express()
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))
app.use(morgan('tiny'))
//default route for starting
app.get('/', (req, res) => {
    res.json({ message: 'Hello world !!' })
})

app.listen('8080', function () {
    console.log('server running on port 8080')
  })