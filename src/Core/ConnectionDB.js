const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017';
const dbName = 'QrDatabase';

async function connectToDB(){
    try {
        
        const client = new MongoClient(uri);

        await client.connect();

        return client.db(dbName);

    } catch (error) {
        console.error('Error na conexão com o database: ', error);
        process.exit(1);
    }
}

module.exports = {
    connectToDB
};