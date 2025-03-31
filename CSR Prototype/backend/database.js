const {Client} = require('pg');
require('dotenv').config();

const client = new Client({
    user:process.env.PGUSER,
    password:process.env.PGPASSWORD,
    host:process.env.PGHOST,
    port:process.env.PGPORT,
    database:process.env.PGDATABASE,
    connectionString:process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/thesisdb'
})

async function connectDB(){
    try{
        await client.connect();
        console.log("Connected to PostgreSQL database");
    }catch(err){
        console.error("Error connecting database",err.stack);
    }
}

connectDB();

module.exports = {
    query: (text,params) => client.query(text,params)
};