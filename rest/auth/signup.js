
const db = require('../db')
const bcrypt = require('bcrypt')

async function createUser(user) {
    try {
        hash = await bcrypt.hash(user.password, 10)
        res = await db.insertUser(user)
        return res    
    } catch (error){
        return 500
    }
}

module.exports = {createUser}   