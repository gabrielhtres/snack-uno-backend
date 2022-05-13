const knex = require('knex') // query builder para conectar com o banco de dados postgres

// dados para conexao com o banco de dados
module.exports = knex({
    client: 'postgres',
    connection: {
        host: 'localhost',
        user: 'docker',
        password: '1234',
        database: 'docker',
        port: 5433
    },
})