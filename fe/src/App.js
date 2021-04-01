import React from 'react';
import './App.css';

import {BrowserRouter, Route, Link} from 'react-router-dom';
import HomeScreen from  './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import productsScreen from './screens/productsScreen';
import CartScreen from './screens/CartScreen';
import signinScreen from './screens/signinScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import {useSelector} from 'react-redux';



function App() {

  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;

 
  function openMenu(){
    document.querySelector(".sidebar").classList.add("open");
  }
  function closeMenu(){
    document.querySelector(".sidebar").classList.remove("open");
  }
  
 
 
  return (
   <BrowserRouter>
   
    <div className="grid-container"> 
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <Link to="/">Shoehub</Link>
            </div>
            <div className="header-links">
                <a href="cart.html">Cart</a>
             {' '}
                {
                  userInfo ? <Link to="/profile">{userInfo.name}</Link>:
                  <Link to="/signin"> Sign-in</Link>
                }
                
           
            </div>
        </header>
        <aside className="sidebar">
                <h3>Shopping Catergories</h3>
                <button className="sidebar-close-button" onClick={closeMenu}>X</button>
                <ul>
                    <li>Sneakers</li>
                    <li>Slides</li>
                    <li>Boots</li>
                </ul>
        </aside>
        <main className="main">
            <div className="content">
              <Route path="/products/:id" exact={true} component={ProductScreen}/>
              <Route path="/" exact={true} component={HomeScreen}/>
              <Route path="/cart/:id?" component={CartScreen}/>
              <Route path="/products" component={productsScreen}/>
              <Route path="/signin" component={signinScreen}/>
              <Route path="/register" component={RegisterScreen}/>
              <Route path="/shipping" component={ShippingScreen}/>
              <Route path="/payment" component={PaymentScreen}/>
              <Route path="/placeorder" component={PlaceOrderScreen}/>
               
            </div>
        </main>
        <footer className="footer">
            All rights reserved
        </footer>
    </div>
    </BrowserRouter> 
  );
}

export default App;
