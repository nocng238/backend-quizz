const nodemailer = require('nodemailer');
const Users = require('./user.model');
const generator = require('generate-password');
const bcrypt = require("bcrypt");


const emailCheck = async (email) => {
    const result = await Users.findOne({ email })
    return result ? true : false
}

const phoneCheck = async (phone) => {
    const result = await Users.findOne({ phone })
    return result ? true : false
}

const phonevalid = async (phone) => {
    if (phone !== /^[0-9]+$/ && phone.length < 10) {
        return false
    }
    return true
}

const cteateUser = async (name, email, phone) => {
    const randomPassword = generator.generate({
        length: 6,
        numbers: true
    });
    //hash passwork
    const passwordHash = await bcrypt.hash(randomPassword, 12);

    const newUser = new Users({ name, email, phone, password: passwordHash })

    const savedUser = await newUser.save();

    return {
        user: savedUser,
        randomPassword
    }
}

const sendGmail = (pass, mail) => {

    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "quy.nguyen@devplus.edu.vn",
            pass: "quyquy111@"
        }
    })

    let details = {
        from: "quy.nguyen@devplus.edu.vn",
        to: mail,
        subject: "Registration confirmation letter",
        text: "Send Gmail to notify ✔",
        html: ` Thank you for signing up to Devplus! your password is: <b>${pass}</b>`

    }
    mailTransporter.sendMail(details, (error) => {
        if (error) {
            console.log("Send mail is error!")
        } else {
            console.log("Send mail is OK!")
        }
    })
}

module.exports = {
    sendGmail, cteateUser, emailCheck,
    phoneCheck, phonevalid
}