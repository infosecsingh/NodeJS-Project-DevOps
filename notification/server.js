const express = require("express");
const nodemailer = require("nodemailer");
require('dotenv').config(); // To use environment variables

const app = express();

app.use(express.json());

// Create a transporter object using the default SMTP transport
// You will need to set the following environment variables:
// EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


app.post("/send", async (req, res) => { // made the function async
    const { name, email, message } = req.body;

    console.log("New hiring request");
    console.log(name, email, message);

    try {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"${name}" <${email}>`, // sender address
            to: process.env.EMAIL_USER, // list of receivers
            subject: "New Hiring Request", // Subject line
            text: message, // plain text body
            html: `<b>From:</b> ${name} <br/><b>Email:</b> ${email} <br/><b>Message:</b><br/>${message}`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        res.send("notification sent");

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending notification");
    }
});

app.listen(3001, () => {
    console.log("notification service running");
});