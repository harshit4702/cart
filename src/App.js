import React,{useState,useEffect,useContext} from 'react';
import { BrowserRouter as Router,Redirect, Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductsList from './pages/ProductsList';

import Navbar from './Components/Navbar';
import MenuBar from './Components/MenuBar';
import Footer from './Components/Footer';

import {mobileView, addCartItem, fetchCartItems, fetchProducts, fetchUsers, auth} from './actions/actions';
import {AppContext} from './AppContext';

import 'semantic-ui-css/semantic.min.css'
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
    dispatch(await fetchProducts());
    dispatch(await fetchUsers());
  },[screenWidth]);

  window.addEventListener("resize", ()=>setScreenWidth(window.innerWidth));


  return (
    <div className="App" style={{backgroundColor: '#f0f5f1'}}>
      <Router>
        <Navbar />
        <MenuBar />
        <Switch>
            <Route path="/"  exact component= {Home} />
            <Route path="/category/:id"  exact component= {()=><ProductsList list={state.products} />} />
            <Route path="/product/:id"  exact component= {ProductDetails} />
            <Route path="/cart"  exact component= {Cart} />
            <Route path="/cart/checkout"  exact component= {Checkout} />
        </Switch>
        <Footer />
      </Router>  
    </div>
  );
}

export default App;
