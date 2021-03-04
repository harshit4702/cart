import React,{useState,useContext, useEffect} from 'react';
import {carouselData} from '../helpers/carouselData';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import {AppContext} from "../AppContext";

const data = carouselData();

const Carousel= ()=> {

    const {state}=  useContext(AppContext);
  
    const [show,setShow]= useState(0);

    useEffect(()=>{
        
        const interval = setInterval(() => {
            setShow(prev=>prev==data.length-1?0:prev+1)
        },5000)
      
        return () => {
        clearInterval(interval);
        };
    },[]);

    console.log(show);

    return (
        <div>
            <ArrowBackIosIcon style={{position: 'absolute',marginTop:state.mobileView?'12vh':'20vh'}} onClick={()=>setShow(prev=>show==0?data.length-1:prev-1)} />
            <img src={data[show].link} style={{width:'100vw',height: state.mobileView?'30vh':'50vh'}} />
            <ArrowForwardIosIcon style={{position: 'absolute',marginLeft:state.mobileView?'-6vw':'-2vw',marginTop:state.mobileView?'12vh':'20vh'}} onClick={()=>setShow(prev=>show==data.length-1?0:prev+1)}/>
        </div>
    );
}

export default Carousel;