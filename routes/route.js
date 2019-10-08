const express = require('express'),
      dataRoute = express.Router(),
      request = require('request')

dataRoute.post('/register',(req,res)=>{
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === "" || req.body['g-recaptcha-response'] === null ){
        res.send({
            responseCode : 1,
            responseDesc : 'Please select captcha'
        })
    }
    var secretKey = "__enter your secret key__"
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress
    request(verificationUrl,(err, response, body)=>{
        body = JSON.parse(body)
        console.log("body",body)
        if(body.success !== undefined && !body.success){
            res.send({
                responseCode : 1,
                responseDesc : 'Failed reCaptcha verification'
            })
        } else {
            res.send({
                responseCode : 0,
                responseDesc : 'Success'
            })
        }
    })
})

module.exports = dataRoute