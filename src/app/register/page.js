'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Home() {
    // Function to handle form submission
    const handleSubmit = (event) => {
    console.log("handling submit");
    /*The purpose of the preventDefualt(() func call is to 
    make sure that the browser does not attempt to refresh the 
    page as older Web 2.0 web applications did*/
    // Baiscally prevents the page from refreshing after form submission
    event.preventDefault();

    // All form input values
    const data = new FormData(event.currentTarget);
    /*All the content into a constant variable titled data then we can use the data.get() func 
    to get the email and password variables from the 
    form data to make them a little bit more accessible*/
    let email = data.get('email')
    let pass = data.get('pass')
    let telephone = data.get('telephone')
    let name = data.get('name')

    // Log the form data for debugging
    console.log("Sent email:" + email)
    console.log("Sent pass:" + pass)
    console.log("Sent telephone: " + telephone)
    console.log("Sent name: " + name)

    // if you want to redirect the infomation just change the redirectory
    runDBCallAsync('/api/register?email=${email}&pass=${pass}&telephone=${telephone}&name=${name}');
    }; // end handle submit

    /* 
    This is where we run a function to talk to the database
    This function will send the data to the API backend to talk to the database*/
    async function runDBCallAsync(url) {
    const res = await fetch(url);  // Make a fetch request to the given URL
    const data = await res.json(); // Parse the response to JSON
    if(data.data== "valid"){
    console.log("login is valid!")
    } else {
    console.log("not valid ")
    }
  }

  return (
      <Container maxWidth="sm">
      {/* Centered form within a container */}
      <Box sx={{ height: '100vh' }} >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
          // Email input field
            margin = "normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
          // password input field
            margin="normal"
            required
            fullWidth
            name="pass"
            label="Pass"
            type="pass"
            id="pass"
          />
          <TextField
            // Name input field
            margin="normal"
            required
            fullWidth
            name="name"
            label="name"
            type="name"
            id="name"
            autoFocus
          />
          <TextField
            // Phone No. input field
            margin="normal"
            required
            fullWidth
            name="telephone"
            label="telephone"
            type="telephone"
            id="telephone"
          />
          {/* Remember me checkbox */}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {/* Submit button */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
        </Box>
      </Box>
    </Container>
  );
} 

