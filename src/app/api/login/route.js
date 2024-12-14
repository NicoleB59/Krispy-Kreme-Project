export async function GET(req, res) {
    // the api. This goes to the console.
    console.log("in the register api page")
    // get the values
    // that were sent across to us
    const url = process.env.DB_ADDRESS;
    const { searchParams } = new URL(req.url);
    const client = new MongoClient(url);
    const dbName = 'Krispy-app'; // database name
    await client.connect();
    console.log('Connected successfully to server');
    const email = searchParams.get('email'); // Add email
    const pass = searchParams.get('pass');  // Add pass
    const role = searchParams.get('role'); // Add role
    const dob = searchParams.get('dob'); // add dob 
    const bcrpt = require('bcrypt');
    const saltRounds = 10;
    const hash = bcrypt.hashSync(pass, saltRounds);
    const db = client.db(dbName);
    const collection = db.collection('login'); // collection name
    const findResult = await collection.find({"username": email}).toArray();
    console.log(email); // log to the console
    console.log(pass);  // log to the console
    console.log(role);  // log to the console
    console.log(dob);   // log to the console
    console.log('Found document =>', findResult);
    let valid = false;
    const bcrypt = require('bcrypt');
    let hashResult = bcrypt.compareSync(pass, findResult[0].pass);
    console.log("checking " + findResult[0].pass);
    console.log("Hash Comparison Result" + hashResult);
    // at the end of the process we need to send something back.
    return Response.json({ "data":"ok" });
}