const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../db')

dotenv.config();
process.env.TOKEN_SECRET;

async function loginUser(params) {
   
    let canLogin = false
    let user = await db.getUserLogin(params)
    let token
    canLogin = await bcrypt.compare(params.password, user.password)
    if(canLogin) 
    {
        const email = user.email
        token =  jwt.sign({ email }, process.env.TOKEN_SECRET, { 
            expiresIn: '1h'
        });
        console.log("Token: " + token)
    }
    return token
}

module.exports = {loginUser}