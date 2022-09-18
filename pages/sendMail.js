require("dotenv").config();
const express = require('express');
const router= express.Router();
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');


router.post('/testMail',async(req,res)=>{
    const transporter=nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: "smtp.gmail.com",
        secure: true,
           auth: {
                user: process.env.mailId,
                pass:  process.env.secPassCode,
             },
    }
    )
    const mailOptions={
        from: process.env.mailId,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    }
    
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log('Email Sent: ' + info.response)
            res.status(200).json(info.response)
        }
    })
})

module.exports =  router