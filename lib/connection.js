//const { MongoClient } = require('mongodb');
import {Connection} from 'postgresql-client';

async function main(){
    const uri = "postgres://postgres:shikha123@localhost:5432/keystone";

const client = new Connection(uri);

try{
    await client.connect();

    await listDatabases(client);
}
catch(e){
    console.error(e)
}
finally{
    await client.close();
}
}

main().catch(console.error);

async function listDatabases(client){
    const databaseslist = await client.db().admin().listDatabases();
    console.log("Databases:")
    databaseslist.databases.forEach(db => {
        console.log(`-${db.name}`);        
    });
}