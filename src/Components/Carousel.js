import React,{useState,useContext, useEffect} from 'react';
import {carouselData} from '../helpers/carouselData';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import {AppContext} from "../AppContext";

const data = carouselData();

const Carousel= ()=> {

    const {state}=  useContext(AppContext);
  
    const [index,setIndex]= useState(0);

    useEffect(()=>{

        const interval = setInterval(() => {
            setIndex(prev=>prev==data.length-1?0:prev+1)
        },5000)
      
        return () => {
        clearInterval(interval);
        };
    },[]);

    console.log(index);

    return (
        <div style={{marginTop:'-1.6vh'}}>
            <ArrowBackIosIcon style={{position: 'absolute',marginTop:state.mobileView?'12vh':'20vh'}} onClick={()=>setIndex(prev=>index==0?data.length-1:prev-1)} />
            <img src={data[index].link} style={{width:state.mobileView?'100vw':'98vw',height: state.mobileView?'30vh':'45vh'}} />
            <ArrowForwardIosIcon style={{position: 'absolute',marginLeft:state.mobileView?'-6vw':'-2vw',marginTop:state.mobileView?'12vh':'20vh'}} onClick={()=>setIndex(prev=>index==data.length-1?0:prev+1)}/>
        </div>
    );
}

export default Carousel;