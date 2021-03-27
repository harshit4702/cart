import React,{useContext, useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import {AppContext} from '../AppContext';
import CartItem from '../Components/CartItem';

const Checkout= ()=> {

    const {state,dispatch}= useContext(AppContext);

    const [amount,setAmount]= useState(0);
    const [discount,setDiscount]= useState(0);

    useEffect(async()=>{
        var amt=0;
        var disct= 0;
        Object.values(state.cart).map((item)=>{
            amt= amt+item.price*item.value;
            disct= disct+ item.discount*item.value;
        });
        setAmount(amt);
        setDiscount(disct);
    },[state.cart]);
   

    return (
        <div style={{marginTop:'3vh',marginBottom:'3vh',marginLeft:'10vw',marginRight:'10vw'}}>
            Checkout
        </div>
    );
}

export default Checkout;
