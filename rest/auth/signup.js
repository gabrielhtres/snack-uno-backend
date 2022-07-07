const db = require('../db')
const bcrypt = require('bcrypt')

async function createUser(params) {
    let hash = await bcrypt.hash(params.password, 10)
    params.password = hash
    await db.insertUser(params)
    return hash
}
module.exports = {createUser}   