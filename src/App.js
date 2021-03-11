import React,{useState,useEffect,useContext} from 'react';
import { BrowserRouter as Router,Redirect, Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

import Navbar from './Components/Navbar';
import Carousel from './Components/Carousel';
import Categories from './Components/Categories';
import Footer from './Components/Footer';

import {mobileView} from './actions/actions';
import {AppContext} from './AppContext';

import './App.css';

const App= ()=> {

  const {state,dispatch}= useContext(AppContext);

  console.log(state);

  const [screenWidth,setScreenWidth]= useState(window.innerWidth);

  useEffect(()=>{
    if(window.innerWidth>560)
      dispatch(mobileView(false));
    else
      dispatch(mobileView(true));
    console.log(screenWidth);
  },[screenWidth]);

  window.addEventListener("resize", ()=>setScreenWidth(window.innerWidth));


  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
            <Route path="/"  exact component= {Home} />
            <Route path="/productdetails"  exact component= {ProductDetails} />
        </Switch>
        <Footer />
      </Router>  
    </div>
  );
}

export default App;
