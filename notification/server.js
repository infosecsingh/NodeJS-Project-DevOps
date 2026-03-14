const express = require("express")
const nodemailer = require("nodemailer")

const app = express()

app.use(express.json())

app.post("/send",(req,res)=>{

const {name,email,message} = req.body

console.log("New hiring request")

console.log(name,email,message)

res.send("notification sent")

})

app.listen(3001,()=>{
console.log("notification service running")
})