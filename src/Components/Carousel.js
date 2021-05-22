import React,{useState,useContext, useEffect} from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from 'react-router-dom';

import {AppContext} from "../AppContext";
import axios from '../axios';

const Carousel= ()=> {

    const {state}=  useContext(AppContext);
  
    const [index,setIndex]= useState(0);

    const [data,setData]= useState([]);

    useEffect(async()=>{
        const response= await axios.get('/carousel');
        setData(response.data);
        console.log(response.data);
    },[])

    useEffect(async()=>{

        if(data.length!=0){
            const interval = setInterval(() => {
                setIndex(prev=>prev==data.length-1?0:prev+1)
            },5000)
        
            return () => {
                clearInterval(interval);
            };
        }
    },[data]);

    if(data.length==0)
        return <>Loading...</>


    return (
        <div>
            <ArrowBackIosIcon style={{position: 'absolute',marginTop:state.mobileView?'12vh':'20vh',cursor:'pointer'}} onClick={()=>setIndex(prev=>index==0?data.length-1:prev-1)} />
                <Link to={{pathname: "/showProducts",state: { selectedCategory: data[index].category}}}>
                    <img src={`/carousel/photos/${data[index]._id}`} style={{width:state.mobileView?'100vw':'98.5vw',height: state.mobileView?'30vh':'45vh'}} />
                </Link>
            <ArrowForwardIosIcon style={{position: 'absolute',marginLeft:state.mobileView?'-6vw':'-2vw',marginTop:state.mobileView?'12vh':'20vh',cursor:'pointer'}} onClick={()=>setIndex(prev=>index==data.length-1?0:prev+1)}/>
        </div>
    );
}

export default Carousel;