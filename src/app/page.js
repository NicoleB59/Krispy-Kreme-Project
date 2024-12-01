'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; 
import Typography from '@mui/material/Typography'; 
import { useState, useEffect } from 'react';
import KrispyKemeLogo from "./images/KrispyKremeLogo.png";


export default function MyApp() {
    // State variables
    const [showLogin, setShowLogin] = useState(false);
    const [showDash, setShowDash] = useState(false);
    // const [showManagerDash, setShowManagerDash] = useState(false);
    const [showRegister, setShowRegister] = useState(true);
    const [showCheckout, setShowCheckout] = useState(false);
    const [products, setProducts] = useState([]);
    const [weather, setWeatherData] = useState({ temp: 'Loading..' });
    // const [orders, setOrders] = useState([]);
    const [role, setRole] = useState('customer');
    const [loginError, setLoginError] = useState(null); // State to store login error


    // Fetch products, weather, and orders
    useEffect(() => {
        fetch('/api/getProducts')
            .then((res) => res.json())
            .then((products) => setProducts(products));

        fetch('/api/getWeather')
            .then((res) => res.json())
            .then((weatherData) => setWeatherData(weatherData))
            .catch((err) => console.error("Error fetching weather", err));
    }, []);

    // useEffect(() => {
    //     if (showManagerDash) {
    //         fetch('/api/getOrders')
    //             .then((res) => res.json())
    //             .then((orderData) => setOrders(orderData))
    //             .catch((err) => console.error("Error fetching orders", err));
    //     }
    // }, [showManagerDash]);

    // Handle role change
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    // Function to handle form submission for registration
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const pass = data.get('pass');
        const telephone = data.get('telephone');
        const name = data.get('name');
        
        console.log("Sent email:", email);
        console.log("Sent pass:", pass);
        console.log("Sent telephone:", telephone);
        console.log("Sent name:", name);
        console.log("Role selected:", role);

        runDBCallAsync(`/api/register?email=${email}&pass=${pass}&telephone=${telephone}&name=${name}&role=${role}`);
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const pass = data.get('pass');
        
        console.log("Login email:", email);
        console.log("Login pass:", pass);

        // Call the API to verify login credentials
        runLoginCallAsync(`/api/login?email=${email}&pass=${pass}`);
    };

    async function runDBCallAsync(url) {
        const res = await fetch(url);
        const data = await res.json();
        if (data.data === "valid") {
            console.log("Registration is valid!");
        } else {
            console.log("Registration failed");
        }
    }

    async function runLoginCallAsync(url) {
        const res = await fetch(url);
        const data = await res.json();
        if (data.data === "valid") {
            console.log("Login successful!");
            setShowLogin(false);
            setShowDash(true);
            setLoginError(null); // Clear error if login is successful
        } else {
            console.log("Login failed");
            setLoginError("Invalid email or password");
        }
    }

    // Functions to show different pages
    function runShowLogin() {
        setShowLogin(true);
        setShowDash(false);
        // setShowManagerDash(false);
        setShowRegister(false);
        setShowCheckout(false);
    }

    function runShowDash() {
        setShowLogin(false);
        setShowDash(true);
        // setShowManagerDash(false);
        setShowRegister(false);
        setShowCheckout(false);
    }

    function runShowRegister() {
        setShowLogin(false);
        setShowDash(false);
        // setShowManagerDash(false);
        setShowRegister(true);
        setShowCheckout(false);
    }

    function runShowCheckout() {
        setShowLogin(false);
        setShowDash(false);
        // setShowManagerDash(false);
        setShowRegister(false);
        setShowCheckout(true);
    }

    function runShowManagerDash() {
        setShowFirstPage(false);
        setShowLogin(false);
        setShowDash(false);
        // setShowManagerDash(true);
        setShowRegister(false);
        setShowCheckout(false);
    }

    // Function to add products to the cart
    function putInCart(pname) {
        console.log("Putting in cart:", pname);
        fetch(`/api/putInCart?pname=${pname}`);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Image src={KrispyKemeLogo} alt="Krispy Kreme" height={50} />
                    </Typography>
                    <Button color='inherit' onClick={runShowRegister}>Register</Button>
                    <Button color="inherit" onClick={runShowLogin}>Login</Button>
                    <Button color="inherit" onClick={runShowDash}>Dashboard</Button>
                    {/* <Button color='inherit' onClick={runShowManagerDash}>ManDash</Button> */}
                    <Button color='inherit' onClick={runShowCheckout}>Checkout</Button>
                </Toolbar>
            </AppBar>

            {showLogin && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    <h2>Login Page</h2>
                    <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
                        <TextField margin="normal" required fullWidth name="pass" label="Password" type="password" id="pass" />

                        {loginError && <Typography color="error">{loginError}</Typography>}

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Login
                        </Button>
                    </Box>
                </Box>
            )}

            {/* {showManagerDash && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    <h2>Manager Dashboard</h2>
                    <div>
                         Manager-specific content goes here 
                    </div>
                </Box>
            )} */} 

            {showRegister && (
                <Box sx={{ height: '100vh' }}>
                    <h2>Registration Page</h2>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
                        <TextField margin="normal" required fullWidth name="pass" label="Password" type="password" id="pass" />
                        <TextField margin="normal" required fullWidth name="name" label="Name" type="text" id="name" autoFocus />
                        <TextField margin="normal" required fullWidth name="telephone" label="Telephone" type="tel" id="telephone" />
                        
                        {/* Role selection */}
                        <FormControl component="fieldset" margin="normal">
                            <RadioGroup row aria-label="role" name="role" value={role} onChange={handleRoleChange}>
                                <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                                <FormControlLabel value="manager" control={<Radio />} label="Manager" />
                            </RadioGroup>
                        </FormControl>
                        <br></br>
                        {/* Remember me checkbox */}
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        
                        {/* Submit button */}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Register
                        </Button>
                    </Box>
                </Box>
            )}

            {showCheckout && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    THIS IS THE CHECKOUT PAGE
                </Box>
            )}

            {showDash && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    Todays temp: {weather.temp}
                    <h2>Products</h2>
                    <div>
                        {products.map((item, i) => (
                            <div style={{ padding: '20px' }} key={i}>
                                Unique ID: {item._id}<br />
                                {item.pname} - {item.price}<br />
                                <Button onClick={() => putInCart(item.pname)} variant="outlined">Add to cart</Button>
                            </div>
                        ))}
                    </div>
                </Box>
            )}
        </Box>
    );
}
