import React,{useState,useEffect,useContext} from 'react';
import { BrowserRouter as Router,Redirect, Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

import {mobileView, addCartItem, fetchCartItems} from './actions/actions';
import {AppContext} from './AppContext';

import './App.css';

const App= ()=> {

  const {state,dispatch}= useContext(AppContext);

  console.log(state);

  const [screenWidth,setScreenWidth]= useState(window.innerWidth);

  useEffect(async()=>{
    if(window.innerWidth>560)
      dispatch(mobileView(false));
    else
      dispatch(mobileView(true));
    console.log(screenWidth);
    dispatch(await fetchCartItems())
  },[screenWidth]);

  window.addEventListener("resize", ()=>setScreenWidth(window.innerWidth));


  return (
    <div className="App" style={{backgroundColor: '#f0f5f1'}}>
      <Router>
        <Navbar />
        <Switch>
            <Route path="/"  exact component= {Home} />
            <Route path="/product/:id/:price"  exact component= {ProductDetails} />
            <Route path="/cart"  exact component= {Cart} />
        </Switch>
        <Footer />
      </Router>  
    </div>
  );
}

export default App;
