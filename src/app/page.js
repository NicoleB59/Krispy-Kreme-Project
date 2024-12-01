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
import Image from 'next/image'; 
import KrispyKemeLogo from "./images/Krispy_Kreme_logo.png";
import DozenBox from "./images/dozen.png";
import DoubleDozen from "./images/double_dozen.png";
import birthdayPack from "./images/birthday_pack.png"
import PromBanner from "./images/Promo.png";
import Grid from "@mui/material/Grid";


export default function MyApp() {
    // State variables
    const [showLogin, setShowLogin] = useState(false);
    const [showDash, setShowDash] = useState(false);
    // const [showManagerDash, setShowManagerDash] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [showHome, setShowHome] = useState(true);
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
        setShowHome(false);
    }

    function runShowDash() {
        setShowLogin(false);
        setShowDash(true);
        setShowRegister(false);
        setShowCheckout(false);
        setShowHome(false);
    }

    function runShowRegister() {
        setShowLogin(false);
        setShowDash(false);
        setShowRegister(true);
        setShowCheckout(false);
        setShowHome(false);
    }

    function runShowCheckout() {
        setShowLogin(false);
        setShowDash(false);
        setShowRegister(false);
        setShowCheckout(true);
        setShowHome(false);
    }

    function runShowHome() {
        setShowHome(true);
        setShowLogin(false);
        setShowDash(false);
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
                        <Image src={KrispyKemeLogo} alt="Krispy Kreme" height={50}/>
                    </Typography>
                    <Button color='inherit' onClick={runShowHome}>Home</Button>
                    <Button color="inherit" onClick={runShowDash}>Store</Button>
                    <Button color='inherit' onClick={runShowRegister}>Register</Button>
                    <Button color="inherit" onClick={runShowLogin}>Login</Button>
                    <Button color='inherit' onClick={runShowCheckout}>Checkout</Button>
                </Toolbar>
            </AppBar>

            {showHome && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }} className="home-page">
                    <div>
                        <Typography variant="h4" component="h1" sx={{ mt: 2, textAlign: 'center' }}>
                            Welcome to Krispy Kreme!
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                            Browse our delicious range of doughnuts and more!
                        </Typography>

                        {/* Image Section */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Image src={DozenBox} 
                                    alt="Dozen Box" 
                                    width={200} 
                                    height={200} 
                                    onClick={() => setShowHome(false) || setShowDash(true)} 
                                    style={{ cursor: 'pointer' }} />
                                <Typography variant="body2">GRAB A DOZEN!</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Image src={DoubleDozen} 
                                    alt="Double Dozen" 
                                    width={200} 
                                    height={200} 
                                    onClick={() => setShowHome(false) || setShowDash(true)} 
                                    style={{ cursor: 'pointer' }}
                                />
                                <Typography variant="body2">GRAB DOUBLE THE DOZEN!!</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Image src={birthdayPack} 
                                    alt="Birthday Pack" 
                                    width={200} 
                                    height={200} 
                                    onClick={() => setShowHome(false) || setShowDash(true)} 
                                    style={{ cursor: 'pointer' }}
                                />
                                <Typography variant="body2">RAISE THE DOUGHBIRTH!!</Typography>
                            </Box>
                        </Box>

                        {/* Wide Image Section */}
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Image src={PromBanner} alt="Wide Promo" width={800} height={150} />
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                Discover more deliciousness at Krispy Kreme!
                            </Typography>
                        </Box>

                        {/* Footer Section */}
                        <Box
                            component="footer"
                            sx={{
                                mt: 4,
                                p: 2,
                                backgroundColor: '#f8f8f8',
                                borderTop: '1px solid #ddd',
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="body2">
                                &copy; {new Date().getFullYear()} Krispy Kreme. All Rights Reserved.
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Follow us on: 
                                <a href="https://facebook.com" style={{ marginLeft: 8, textDecoration: 'none' }}>Facebook</a> | 
                                <a href="https://instagram.com" style={{ marginLeft: 8, textDecoration: 'none' }}>Instagram</a> | 
                                <a href="https://twitter.com" style={{ marginLeft: 8, textDecoration: 'none' }}>Twitter</a>
                            </Typography>
                        </Box>
                    </div>
                </Box>
            )}


            {showLogin && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }} className="login-form">
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
            {showRegister && (
                <Box className="centered-form">
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
                    <br />
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
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {products.map((item, i) => (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                            <div className="showDash-card">
                                <Typography
                                    variant="h6"
                                    component="div"
                                    className="showDash-card-title"
                                >
                                    Unique ID: {item._id}
                                    <br />
                                    {item.pname}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    className="showDash-card-price"
                                >
                                    Price: €{item.price}
                                </Typography>
                                <Button
                                    onClick={() => putInCart(item.pname)}
                                    className="showDash-card-button"
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
