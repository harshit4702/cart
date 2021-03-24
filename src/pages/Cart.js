import React,{useContext, useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import {AppContext} from '../AppContext';
import CartItem from '../Components/CartItem';

const Cart= ()=> {

    const {state,dispatch}= useContext(AppContext);

    const [amount,setAmount]= useState(0);

    useEffect(async()=>{
        var amt=0;
        Object.values(state.cart).map((item)=>{
            amt= amt+item.price*item.value;
        });
        setAmount(amt);
    },[state.cart]);

    console.log(state);

    const cartMenu= ()=>{
        if(amount==0)
            return (
                <Grid container spacing={3}>
                    <Grid item>
                        Logo
                    </Grid>
                    <Grid item>
                        Card is Empty
                    </Grid>
                </Grid>
        )

        return (
            Object.values(state.cart).map((ob,index)=>{
                return (
                   <CartItem src="" ob={ob} key={index} />
                );
            })
        )
    }

    return (
        <div style={{marginTop:'3vh',marginBottom:'3vh',marginLeft:'10vw',marginRight:'10vw'}}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Paper elevation={1}>
                        MyCart
                        <hr/>
                        {cartMenu()}
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper elevation={1}>

                        <h4 style={{fontFamily:'sans-serif'}}>Price Details</h4>
                        <hr/>
                        <h4 style={{fontFamily:'sans-serif'}}>Total Amount:- {amount}</h4>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Cart;
