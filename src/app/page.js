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
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem"
import { useState, useEffect } from 'react';    
import Image from 'next/image';                 
import KrispyKemeLogo from "./images/Krispy_Kreme_logo.png";
import DozenBox from "./images/dozen.png";
import DoubleDozen from "./images/double_dozen.png";
import birthdayPack from "./images/birthday_pack.png"
import PromBanner from "./images/Promo.png";
import Grid from "@mui/material/Grid";         
var validator = require("email-validator");
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function MyApp() {
    // State variables
    const [showLogin, setShowLogin] = useState(false);                  // State for controlling login form visibility.               
    const [showDash, setShowDash] = useState(false);                    // State for controlling dashboard visibility.
    const [showRegister, setShowRegister] = useState(false);            // ^^ registration ^^.
    const [showCheckout, setShowCheckout] = useState(false);            // ^^ Checkout ^^.
    const [showHome, setShowHome] = useState(true);                     // ^^ home ^^.
    const [showCart, setShowCart] = useState(false);                    // ^^ cart ^^.
    const [products, setProducts] = useState([]);                       // State for storing the fetched product list.
    const [weather, setWeatherData] = useState({ temp: 'Loading..' });  // State for storing weather data.
    const [cart, setCart] = useState([]);                               // State for storing the cart items.
    const [role, setRole] = useState('customer');                       // State for storing the user role (e.g., customer, manager).
    const [loginError, setLoginError] = useState(null);                 // State to store login error
    const [anchorEl, setAnchorEl] = useState(null);                     // For dropdown menu
    const [orders, setOrders] = useState([]);                           // State for storing order data. NOT USED YET
    const [total, setTotal] = useState(0);                              // State for calculating the total price of cart items. NOT USED YET
    const [ManDash, setManDash] = useState();
    const [open, setOpen] = React.useState(false);



    // Open dropdown menu
    const handleMenuClick = (event) => {    // Handle click event on menu button to open the dropdown.
        setAnchorEl(event.currentTarget);   // Set the anchor element for the menu.
    };

    const handleMenuClose = () => {     // Close the dropdown menu.
        setAnchorEl(null);              // Set anchor element to null, closing the menu.
    };

    // List of menu items with corresponding actions. (This is for the dropdown navbar)
    const menuItems = [
        { label: 'Home', action: runShowHome },
        { label: 'Store', action: runShowDash },
        { label: 'Register', action: runShowRegister },
        { label: 'Login', action: runShowLogin },
        { label: 'Cart', action: runShowCart },
        { label: 'Checkout', action: runShowCheckout }
    ];
    
    useEffect(() => {                   // Fetch products when the component mounts.
        fetch('/api/getProducts')       // API call to fetch products.
            .then((res) => res.json())  // Convert the response to JSON.
            .then((products) => setProducts(products))  // Update the state with fetched products.
            .catch((err) => console.error("Error fetching products:", err));  // Handle any errors during fetching.
    }, []);  // Empty dependency array, meaning it only runs once when the component mounts.

    useEffect(() => {  // Fetch weather data when the component mounts
        fetch('/api/getWeather')  
            .then((res) => res.json())  
            .then((weatherData) => setWeatherData(weatherData)) 
            .catch((err) => console.error("Error fetching weather:", err));  
    }, []);  

    useEffect(() => {  // Fetch cart items when the component mounts
        fetch('/api/getCart') 
            .then((res) => res.json())  
            .then((cartItems) => setCart(cartItems)) 
            .catch((err) => console.error("Error fetching cart items:", err));  
    }, []);  

    useEffect(() => {  // Fetch orders when the component mounts
        // Fetch orders from API
        fetch('/api/getOrders') // Adjust the URL according to your API
          .then(res => res.json())
          .then(data => {
            setOrders(data);
            setTotal(data.reduce((sum, order) => sum + order.price, 0)); // Assuming price is stored in each order
          });
    }, []);

    // Handle role change/Function to handle role selection (customer or manager).
    const handleRoleChange = (event) => {
        setRole(event.target.value); // Update the role based on selected value.
    };

    const validateForm = (event) => {
        let errorMessage = '';

        const data = new FormData(event.currentTarget);

        //get email
        let email = data.get('email');
        //pull in validator
        var validate = require("email-validator");
        //run the validator
        let emailCheck = validator.validate(email);
        //print the status true or false
        console.log("email status" + emailCheck);
        // if it is false, add to the error message
        if(emailCheck == false){
            errorMessage += 'Incorrect email';
        }
        return errorMessage;
    }

    // Register handlesubmit
    const handleSubmit = (event) => {  // Handle registration form submission.
        event.preventDefault();  // Prevent default form submission behavior.

        // call out custom validator
        let errorMessage = validateForm(event);

        // save the mesage
        setErrorHolder(errorMessage);

        // if we have an error
        if(errorMessage.length > 0){
            setOpen(true); // open the dialog and show the user the error.
        } else {
            // if we do not get an error
            const data = new FormData(event.currentTarget);  // Extract form data.
            const email = data.get('email');  // Get email from form data.
            const pass = data.get('pass');  // Get password from form data.
            const telephone = data.get('telephone');  // Get telephone from form data.
            const name = data.get('name');  // Get name from form data.
            const role = data.get('role');

            // Log the form values for debugging.
            console.log("Sent email:", email);
            console.log("Sent pass:", pass);
            console.log("Sent telephone:", telephone);
            console.log("Sent name:", name);
            console.log("Role selected:", role);

            // Call the registration API with the form data.
            runDBCallAsync(`/api/register`, email, pass, telephone, name, role);
        }
    };

    // Login handlesubmit
    const handleLoginSubmit = (event) => {  // Handle login form submission.
        event.preventDefault();  // Prevent default form submission behavior.

        // call out custom validator
        let errorMessage = validateForm(event);

        // save the mesage
        setErrorHolder(errorMessage);

        // if we have an error
        if(errorMessage.length > 0){
            setOpen(true); // open the dialog and show the user the error.
        } else {
            const data = new FormData(event.currentTarget);  // Extract form data.
            const email = data.get('email');  // Get email from form data.
            const pass = data.get('pass');  // Get password from form data.

            // Log the login data for debugging.
            console.log("Login email:", email);
            console.log("Login pass:", pass);

            // Call the login API with the form data.
            runDBCallAsync(`/api/login`, email, pass);
        }
    };

    // REGISTRATION 
    async function runDBCallAsync(url, email, pass, telephone, name, role) {  
        await fetch(url, {
            method: 'POST', // Type of the request
            headers: {
                'Content-Type': 'application/json', //Type of data being sent
            },
            body: JSON.stringify({
                email, pass, telephone, name, role
            })
        })
    }
    

    // Functions to show different pages
    function runShowLogin() {
        setShowLogin(true);
        setShowDash(false);
        setShowRegister(false);
        setShowCheckout(false);
        setShowHome(false);
        setShowCart(false);
    }

    function runShowDash() {
        setShowLogin(false);
        setShowDash(true);
        setShowRegister(false);
        setShowCheckout(false);
        setShowHome(false);
        setShowCart(false);
    }

    function runShowRegister() {
        setShowLogin(false);
        setShowDash(false);
        setShowRegister(true);
        setShowCheckout(false);
        setShowHome(false);
        setShowCart(false);
    }

    function runShowCheckout() {
        setShowLogin(false);
        setShowDash(false);
        setShowRegister(false);
        setShowCheckout(true);
        setShowHome(false);
        setShowCart(false);
    }

    function runShowHome() {
        setShowHome(true);
        setShowLogin(false);
        setShowDash(false);
        setShowRegister(false);
        setShowCheckout(false);
        setShowCart(false);
    }

    function runShowCart(){
        setShowHome(false);
        setShowLogin(false);
        setShowDash(false);
        setShowRegister(false);
        setShowCheckout(false);
        setShowCart(true);
    }
    
    // Function to add products to the cart
    function putInCart(pname, price) {
        console.log("Putting in cart:", pname, price);
        
        // Direct fetch request with pname and price
        fetch(`/api/putInCart?pname=${encodeURIComponent(pname)}&price=${encodeURIComponent(price)}`);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // second
    const [errorHolder, setErrorHolder] = React.useState(false);
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        {/* Desktop Dropdown Menu */}
                        <Button color="inherit" onClick={handleMenuClick}><MenuIcon /></Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            {menuItems.map((item, index) => (
                                <MenuItem key={index} onClick={() => { item.action(); handleMenuClose(); }}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Menu>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Image src={KrispyKemeLogo} alt="Krispy Kreme" height={50}/>
                    </Typography>
                    <Button color='inherit' onClick={runShowHome}>Home</Button>
                    <Button color="inherit" onClick={runShowDash}>Store</Button>
                    <Button color='inherit' onClick={runShowRegister}>Register</Button>
                    <Button color="inherit" onClick={runShowLogin}>Login</Button>
                </Toolbar>
            </AppBar>
            
            {showHome && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }} className="home-page">
                    {/* Displaying current weather temperature fetched from an API */}
                    Todays temp: {JSON.stringify(weather.temp)}
                    <div>
                        {/* Main heading for the page */}
                        <Typography class="WellKrispyKreme" variant="h4" component="h1" sx={{ mt: 2, textAlign: 'center' }}>
                            Welcome to Krispy Kreme!
                        </Typography>
                        {/* Subheading with a short description of the store */}
                        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                            Browse our delicious range of doughnuts and more!
                        </Typography>

                        {/* Image Section with clickable product options */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
                            {/* Product 1: Dozen Box */}
                            <Box sx={{ textAlign: 'center' }}>
                                <Image src={DozenBox} 
                                    alt="Dozen Box" 
                                    width={200} 
                                    height={200} 
                                    onClick={() => setShowHome(false) || setShowDash(true)} 
                                    style={{ cursor: 'pointer' }} />
                                <Typography variant="body2">GRAB A DOZEN!</Typography>
                            </Box>
                            {/* Product 2: Double Dozen */}
                            <Box sx={{ textAlign: 'center' }}>
                                <Image src={DoubleDozen} 
                                    alt="Double Dozen" 
                                    width={200} 
                                    height={200} 
                                    onClick={() => setShowHome(false) || setShowDash(true)} 
                                    style={{ cursor: 'pointer' }} />
                                <Typography variant="body2">GRAB DOUBLE THE DOZEN!!</Typography>
                            </Box>
                            {/* Product 3: Birthday Pack */}
                            <Box sx={{ textAlign: 'center' }}>
                                <Image src={birthdayPack} 
                                    alt="Birthday Pack" 
                                    width={200} 
                                    height={200} 
                                    onClick={() => setShowHome(false) || setShowDash(true)} 
                                    style={{ cursor: 'pointer' }} />
                                <Typography variant="body2">RAISE THE DOUGHBIRTH!!</Typography>
                            </Box>
                        </Box>
                    </div>

                    {/* Promotional Banner */}
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
                        {/* Social Media Links */}
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Follow us on: 
                            <a href="https://facebook.com" style={{ marginLeft: 8, textDecoration: 'none' }}>Facebook</a> | 
                            <a href="https://instagram.com" style={{ marginLeft: 8, textDecoration: 'none' }}>Instagram</a> | 
                            <a href="https://twitter.com" style={{ marginLeft: 8, textDecoration: 'none' }}>Twitter</a>
                        </Typography>
                    </Box>
                </Box>
            )}

            {showLogin && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }} className="login-form">
                    <h2>Login Page</h2>
                    <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
                        {/* Input fields for email and password */}
                        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
                        <TextField margin="normal" required fullWidth name="pass" label="Password" type="password" id="pass" />

                        {/* Display login error message if exists */}
                        {loginError && <Typography color="error">{loginError}</Typography>}

                        {/* Login button */}
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
                // Conditionally render the checkout section if the 'showCheckout' state is true
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    
                    {/* Checkout Page Header */}
                    <Typography variant="h4" sx={{ textAlign: 'center' }}>
                        Checkout Page
                    </Typography>

                    {/* Section for the 'BUY' button, centered on the page */}
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        
                        {/* The 'BUY' button */}
                        <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ width: '100%', padding: '10px', fontSize: '16px' }} 
                            // Currently logs 'Proceeding to Buy...' to the console when clicked
                            onClick={() => console.log('Proceeding to Buy...')}  // Replace this with actual functionality for processing the purchase
                        >
                            {/* Button label */}
                            BUY
                        </Button>
                    </Box>
                </Box>
            )}

            {showCart && (
                <Box sx={{ p: 2 }}>
                    <Typography variant="h4" sx={{ textAlign: 'center' }}>
                        Your Shopping Cart
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {cart.map((item, i) => (
                            <Grid item xs={12} sm={6} md={4} key={i}>
                                <Box sx={{ border: '1px solid #ddd', padding: 2, borderRadius: 2 }}>
                                    {/* Displaying item details in the cart */}
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body2">{item.description}</Typography>
                                    <Typography variant="body2">${item.price}</Typography>

                                    {/* Remove item from cart */}
                                    <Button variant="contained" color="error" onClick={() => removeFromCart(item)}>
                                        Remove
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Cart Total and Checkout Button */}
                    <Box sx={{ textAlign: 'right', mt: 2 }}>
                        <Typography variant="h6">Total: ${cartTotal}</Typography>
                        <Button variant="contained" color="primary" onClick={handleCheckout}>Proceed to Checkout</Button>
                    </Box>
                </Box>
            )}

            {showDash && (    
                // Container for displaying the list of products in a grid layout
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {/* Iterates through the list of products and displays each one */}
                    {products.map((item, i) => (
                        // Defines the layout of each product card in the grid, with different sizes for various screen widths
                        <Grid item xs={12} sm={6} md={4} key={i}>
                            {/* Each product is displayed within a card-like container */}
                            <div className="showDash-card">
                                {/* Product name (displayed as a heading) */}
                                <Typography
                                    variant="h6"
                                    component="div"
                                    className="showDash-card-title"
                                >
                                    {/* The unique identifier for each product is currently commented out */}
                                    {/* Unique ID: {item._id} */}
                                    <br />
                                    {/* Display the product name */}
                                    {item.pname}
                                </Typography>

                                {/* Product price displayed below the name, styled as secondary text */}
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    className="showDash-card-price"
                                >
                                    {/* Show the product price in euros */}
                                    Price: €{item.price}
                                </Typography>

                                {/* Button to add the product to the shopping cart */}
                                <Button
                                    // When clicked, this triggers the function to add the item to the cart
                                    onClick={() => putInCart(item.pname)}
                                    className="showDash-card-button"
                                >
                                    {/* Button text */}
                                    Add to Cart
                                </Button>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            )}
                <React.Fragment>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >

                    <DialogTitle id="alert-dialog-title">
                        {"Error"}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {errorHolder}
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>

                    </Dialog>

                </React.Fragment>
        </Box>
    );

}
