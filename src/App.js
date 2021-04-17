import React,{useState,useEffect,useContext} from 'react';
import { BrowserRouter as Router,Redirect, Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductsList from './pages/ProductsList';

import Navbar from './Components/Navbar';
import MenuBarDesktop from './Components/MenuBarDesktop';
import MenuBarMobile from './Components/MenuBarMobile';
import Footer from './Components/Footer';
import CheckoutError from './Components/CheckoutError';

import MyProfile from './pages/MyProfile';

import {mobileView, addCartItem, fetchCartItems, fetchProducts, fetchUsers, auth, fetchCategories} from './actions/actions';
import {AppContext} from './AppContext';

import 'semantic-ui-css/semantic.min.css'
import './App.css';

const App= ()=> {

  const {state,dispatch}= useContext(AppContext);

  console.log(state);

  const [screenWidth,setScreenWidth]= useState(window.innerWidth);

  useEffect(async()=>{
    console.log(screenWidth);
    if(window.innerWidth>560)
      dispatch(mobileView(false));
    else
      dispatch(mobileView(true));
    console.log(screenWidth);
    dispatch(await fetchProducts());
    dispatch(fetchCategories());
    dispatch(await fetchUsers());
  },[screenWidth]);

  window.addEventListener("resize", ()=>setScreenWidth(window.innerWidth));

  return (
    <div className="App" style={{backgroundColor: '#f0f5f1'}}>
      <Router>
        <Navbar />
        {
          screenWidth<=560?<MenuBarMobile />:<MenuBarDesktop />
        }
        <Switch>
            <Route path="/"  exact component= {Home} />
            <Route path="/category/:id"  exact component= {()=><ProductsList list={state.products} />} />
            <Route path="/product/:id"  exact component= {ProductDetails} />
            <Route path="/cart"  exact component= {Cart} />
            <Route path="/profile"  exact component= {MyProfile} />
            <Route path="/cart/checkout"  exact render={(props) =>!props.location.state || !state.auth.isSignedIn? <CheckoutError  />:<Checkout />} />
        </Switch>
        <Footer />
      </Router>  
    </div>
  );
}

export default App;
