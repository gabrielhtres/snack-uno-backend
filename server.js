const http = require('http')
const app = require('./app')
const port = process.env.PORT || 3000
const server = http.createServer(app) //passei o app para o server para que ele possa tratar as requisições
server.listen(port)

