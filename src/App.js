import React,{useState,useEffect,useContext} from 'react';
import Box from '@material-ui/core/Box';

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
    if(window.innerWidth>550)
      dispatch(mobileView(false));
    else
      dispatch(mobileView(true));
    console.log(screenWidth);
  },[screenWidth]);

  window.addEventListener("resize", ()=>setScreenWidth(window.innerWidth));


  return (
    <div className="App">
      <Navbar />
      <p>
        Hello
      </p>
      <Carousel />
      <p>
        Categories
      </p>
      <Footer />
    </div>
  );
}

export default App;
