export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the register api page")
    // Import Mongo client for connecting to the database
    const { MongoClient } = require('mongodb');
    const url = process.env.DB_ADDRESS
    const client = new MongoClient(url);
    const dbName = 'Krispy-app'; // database name
    await client.connect(); // connect to database
    console.log('Connected successfully to server');
    const body = await req.json(); // turns the string into a json object
    const{email, pass, name} = body;
    // Hashing passwords - Import the bcrypt library
    const bcrypt = require('bcrypt');
    // Define the number of rounds for salting the hash
    const saltRounds = 10;
    // Hash the user's password securely
    const hash = bcrypt.hashSync(pass, saltRounds);
    const db = client.db(dbName); // access the specific database
    const collection = db.collection('user'); // collection name
    const findResult = await collection.insertOne({"username": email, "pass": hash});
    // log the result of the database insertion for debugging
    console.log('Found documents =>', findResult);
    // at the end of the process we need to send something back.
    return Response.json(findResult);
}