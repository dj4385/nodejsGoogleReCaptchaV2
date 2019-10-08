const express = require('express'),
      app = express(),
      bodyParser = require('body-parser')
      dataRoute = require('./routes/route')


app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use('/v1/',dataRoute)

app.listen('3000',()=> console.log('server started'))