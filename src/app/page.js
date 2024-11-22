/*
Need to pull in the different functions and features we want to use in the app. 
These are mainly for using the predefined elements such as a nav bar and buttons etc.
*/
'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
/* 
Purpose of this is to allow us to use a feature to 
store boolean values that we can flip from true to false at the click of a button.
*/
import {useState, useEffect} from 'react';

// The core “default function” for the app, similar to the main function in Java.
export default function MyApp() {

    // Three state variables
    // showLogin
    const [showLogin, setShowLogin] = useState(false);
    // showDash
    const [showDash, setShowDash] = useState(false);    
    // showFirstPage
    const [showFirstPage, setShowFirstPage] = useState(true);
    // showManagerDash
    const [showManagerDash, setshowManagerDash] = useState(false);
    // showRegister
    const [showRegister, setshowResgister] = useState(false);
    // showCheckout
    const [showCheckout, setshowCheckout] = useState(false);
    // State for products
    const [products, getProducts] = useState();
    // State for weather - temp: 'Loading' ensures that weather.temp is always defined
    const [weather, setWeatherData] = useState({temp: 'Loading..'});
    // State for orders
    const [orders, setOrders] = useState();

    useEffect(() => {
        fetch('/api/getProducts')
            .then((res) => res.json())
            .then((products) => {   
            getProducts(products)
        })    
    }, []);

    useEffect(() => {
        fetch('/api/getWeather')
            .then((res) => res.json())
            .then((weatherData) => {
                setWeatherData(weatherData); // Update the state with fetched data
            })
            .catch((err) => console.error("Error fetching weather", err));
    }, []);

    useEffect(() => {
        if (showManagerDash) {
            fetch('/api/getOrders')
                .then((res) => res.json())
                .then((orderData) => {
                    setOrders(orderData); // Update the state with fetched orders
                })
                .catch((err) => console.error("Error fetching orders", err));
        }
    }, [showManagerDash]); // Fetch orders only when the manager's dashboard is visible
    
    console.log(products);
    console.log(weather);
    console.log(orders);

    // 6 functions
    function runShowLogin(){
        setShowFirstPage(false);
        setShowLogin(true);
        setShowDash(false);
        setshowManagerDash(false);
        setshowResgister(false);
        setshowCheckout(false);
    };

    /*
    When we click a button and we want to show the dashboard, we can make a call to the runShowDash() function. 
    It will hide the first page, hide the login and then show the dashboard by setting it to true.
    */
    function runShowDash(){
        setShowFirstPage(false);
        setShowLogin(false);
        setShowDash(true);
        setshowManagerDash(false);
        setshowResgister(false);
        setshowCheckout(false);
    }

    function runShowFirst(){
        setShowFirstPage(true);
        setShowLogin(false);
        setShowDash(false);
        setshowManagerDash(false);
        setshowResgister(false);
        setshowCheckout(false);
    }

    function runShowRegister(){
        setShowFirstPage(false);
        setShowLogin(false);
        setShowDash(false);
        setshowManagerDash(false);
        setshowResgister(true);
        setshowCheckout(false);
    }

    function runShowCheckout(){
        setShowFirstPage(false);
        setShowLogin(false);
        setShowDash(false);
        setshowManagerDash(false);
        setshowResgister(false);
        setshowCheckout(true);
    }

    function runShowManagerDash(){
        setShowFirstPage(false);
        setShowLogin(false);
        setShowDash(false);
        setshowManagerDash(true);
        setshowResgister(false);
        setshowCheckout(false);
    }

    function putInCart(pname){
        console.log("putting in cart= " + pname);
      
        fetch("/api/putInCart?pname=" + pname);

    }   

    /*
    Add in the return() statement that is used to send all the app content back to the user.
    This is where we define the look of the app by using a MUI NavBar component. 
    The code within the AppBar is the core elements building up the nav bar with three butons.
    */
    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        
                    <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                        MyApp

                    </Typography>

                    {/*
                    Each has an onClick attribute.
                    First button - it will call the runShowFirst() function 
                    whose job it is to hide the content from the user for the login and the dashboard, 
                    and only show them the first page.
                    */}
                    <Button color="inherit" onClick={runShowFirst}>First</Button>

                    <Button color="inherit" onClick={runShowLogin}>Login</Button>

                    <Button color="inherit" onClick={runShowDash}>Dashboard</Button>

                    <Button color='inherit' onClick={runShowManagerDash}>ManDash</Button>

                    <Button color='inherit' onClick={runShowCheckout}>Checkout</Button>

                    <Button color='inherit' onClick={runShowRegister}>Register</Button>

                </Toolbar>

            </AppBar>
            
            {/*
            Each of these are using the “box” component. 
            At the top of each block you will notice there is a variable and a set of && operators.

            when the showFirstPage variable is set to true, it will show the box block of code beside it. 
            The same goes for the showLogin. 
            If the variable is set to true, then we show the block of code beside it to the user.
            */}
            {showFirstPage &&
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    <p>THIS IS THE CUSTOMER PAGE.</p>
                </Box>
            }
             {/* Login page for the application that will send the user to the correct page based on their account type. 
             Either to /manager or /customer.*/}
            {showLogin &&
                <Box component="section" sx={{ p: 2, border: '1px dashed grey'}}>
                    tHIS IS THE LOGIN PAGE
                </Box>
            }

            {showManagerDash &&
                <Box component="section" sx={{ p: 2, border: '1px dashed grey'}}>
                    <h2>Manager Dashboard</h2>
                        <div>
                            
                        </div>
                </Box>
            }
            {/*A register page allowing the user to sign up.*/}
            {showRegister &&
                <Box component="section" sx={{ p: 2, border: '1px dashed grey'}}>
                    <h2>REGISTER HERE!</h2>
                    <div>

                    </div>
                </Box>
            }
            
            {showCheckout &&
                <Box component="section" sx={{ p: 2, border: '1px dashed grey'}}>
                    THIS IS THE CHECKOUT PAGE
                </Box>
            }

            {/* This is my customer page -  A page showing all the products allowing 
            the user to select a product and add it to their cart. 
            Each product should have a title, description, image, and price. 
            This page should also have the current weather on the top of the page from the weather API.*/}
            {showDash &&
                <Box component="section" sx={{ p: 2, border: '1px dashed grey'}}>
                    Todays temp: {weather ? JSON.stringify(weather.temp) : 'Loading...'}
                    <h2>Products</h2>
                    <div>
                        {   
                            products.map((item, i) => (
                                <div style={{padding: '20px'}} key={i} >
                                    Unique ID: {item._id}
                                    <br></br>
                                    {item.pname}
                                    -
                                    {item.price}
                                    <br></br>
                                    <Button onClick={() => (putInCart(item.pname))} variant="outlined"> Add to cart </Button>
                                </div>
                            ))
                        }
                    </div>
                </Box>
            }

        </Box>
        /*
        To build a multi-screen app, you can create different `<Box>` components for each screen (e.g., dashboard, login, register) on the same page. 
        Each screen is controlled by a state variable that toggles between `true` (visible) and `false` (hidden). 
        When a user clicks a button in the navbar, the corresponding state is set to `true`, displaying that screen. 
        This approach reduces server requests, as all content is already loaded and only shown as needed.
        */
    );
}