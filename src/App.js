import React,{useState,useEffect,useContext} from 'react';
import Navbar from './Components/Navbar';
import Carousel from './Components/Carousel';
import Box from '@material-ui/core/Box';

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
    <Box component="span" m={1} className="App">
      <Navbar />
      <p>
        Hello
      </p>
      <Carousel />
    </Box>
  );
}

export default App;
