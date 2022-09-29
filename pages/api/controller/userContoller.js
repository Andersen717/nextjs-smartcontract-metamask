const db_EXE = require('../db');
const User = require("../model/userModel");
const jwt = require('jsonwebtoken');
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

var i = 0;

console.log(User);
//Post Request for Register
const registerUser = async (req, res) => {
    i++;
    console.log(i);
    try {
        const { r_mail, r_pass, r_con } = req.body;
        if (r_mail == '' || r_pass == '' || r_con == '')
            throw new Error("Fill empty fields");
        if (r_pass !== r_con) throw new Error("r_pass must match");

        var user = await User.findOne({ mail: r_mail });
        if (user) throw new Error('r_mail exists');

        console.log(user);
        const newUser = new User({
            mail: r_mail,
            password: r_pass,
        });
        await newUser.save();
        return res.send("success");

    } catch (err) {
        console.log(err.message)
        res.status(400).json({
            error: err.message
        })
    }
};

//Logging in Function
const loginUser = async (req, res) => {

    i++;
    console.log(i);
    try {
        const { l_pass, l_mail } = req.body;
        if (l_pass == '' || l_mail == '') throw new Error("invalid mail");

        var users = await User.find({ mail: l_mail, password: l_pass });
        console.log(users);
        if (users.length <= 0) res.send('incorrectValue');
        const token = jwt.sign({ mail: l_mail }, 'MyFistNextProject', { expiresIn: '1d' });
        console.log('token: ', token);
        return res.send(token);
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({
            error: err.message
        })
    }
};
module.exports = {
    registerUser,
    loginUser,
};