const dotenv = require('dotenv');

dotenv.config();

process.on('SIGINT', () => http.close((error) => {
    if(error){
        console.error(`${error.name}: ${error.message}`);
    }
    process.exit(error ? 1 : 0);
}));

