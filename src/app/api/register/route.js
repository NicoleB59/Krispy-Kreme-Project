export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the register api page")
    // get the values
    // that were sent across to us
    const url = process.env.DB_ADDRESS
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const pass = searchParams.get('pass');
    const role = searchParams.get('role'); // Add role
    console.log(email);
    console.log(pass);
    console.log(role);
    // database call goes here
    // at the end of the process we need to send something back.
    return Response.json({ "data":"ok" })
}

