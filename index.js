const express = require("express")
const hbs = require("hbs")
const path = require("path")
const urlEncoder = require("body-parser")
const nodemailer = require("nodemailer")
const { error } = require("console")

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:"kv4492372@gmail.com",
        pass:"ouumruqnpahozqzn"
    }

})

const app = express()

const formvar = urlEncoder.urlencoded()

app.set('view engine', 'hbs');

hbs.registerPartials(path.join (__dirname + '/views/partials'))

app.use(express.static(path.join(__dirname,"/views/public")))

app.get("/",(req,res)=>{
    return res.render("index")
})

app.get("/about",(req,res)=>{
    return res.render("about")
})
app.get("/faq",(req,res)=>{
    return res.render("faq")
})
app.get("/gallery",(req,res)=>{
    return res.render("gallery")
})
app.get("/services",(req,res)=>{
    return res.render("services")
})
app.get("/contactus",(req,res)=>{
    return res.render("contactus",{show:false})
})
app.post("/contactus",formvar,(req,res)=>{
    let mailOption ={
        from: "kv4492372@gmail.com",
        to: req.body.email,
        subject:"Your Query Recieved !!!! Team My Shop",
        text:"ThankYou \n to Share Your Query With us\n Our Team will contact you soon"

    }
    transporter.sendMail(mailOption,(error,data)=>{
        if(error)
        console.log(error)
    })
    
    mailOption ={
        from:"kv4492372@gmail.com", 
        to:"kv4492372@gmail.com",
        subject:"User Query recieved!!:Team My Shop",
        text:`
        Name :${req.body.name}
        Email : ${req.body.email}
        Subject:${req.body.subject}
        Message:${req.body.message}
        `
    }
    transporter.sendMail(mailOption,(error,data)=>{
        if(error)
        console.log(error)
    })
    return res.render("contactus",{show:true})
})

app.listen(80,()=>console.log("Server is running on port 80"))