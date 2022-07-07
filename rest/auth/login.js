const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../db')

dotenv.config();
process.env.TOKEN_SECRET;

async function loginUser(params) 
{
    let user = await db.getUserLogin(params)
    if (!user) return false
    let canLogin = await bcrypt.compare(params.password, user.password)
    let token
    if(canLogin) 
    {
        const email = user.email
        token =  jwt.sign({ email }, process.env.TOKEN_SECRET, { 
            expiresIn: '1h'
        });
        console.log("Token: " + token)
        return {
            email: user.email,
            password: token
        }
    }
    return canLogin
}

module.exports = {loginUser}