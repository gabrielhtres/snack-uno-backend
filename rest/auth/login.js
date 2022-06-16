const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../db')

dotenv.config();
process.env.TOKEN_SECRET;

async function loginUser(user) {
    try {
        let canLogin = false
        let res = await db.getUser(user)
        canLogin = await bcrypt.compare(user.password, res.password)
        if(canLogin) 
        {
            const email = res.email
            token =  jwt.sign({ email }, process.env.TOKEN_SECRET, { 
                expiresIn: '1h'
            });
            console.log("Token: " + token)
        }
        canLogin ? console.log('Login successful!') : console.log('Login failed!')
        if (canLogin) 
            return 201
        else 
            return 401
    } catch (error) {
        return 501
    }
}

module.exports = {loginUser}