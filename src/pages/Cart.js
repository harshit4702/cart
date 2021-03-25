import React,{useContext, useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import {AppContext} from '../AppContext';
import CartItem from '../Components/CartItem';

const Cart= ()=> {

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

    console.log(state);

    const len = Object.values(state.cart).length; 

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
                   <CartItem ob={ob} key={index} />
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

                        <h3 style={{fontFamily: `'IBM Plex Serif',serif`}}>Price Details</h3>
                        <hr/>
                        <Grid container spacing={3} justify="space-around">
                            <Grid item >
                                <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}>Price({len} {len>1?'items':'item'})</h4>
                            </Grid>
                            <Grid item>
                                <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}> ₹{amount}</h4>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} justify="space-around">
                            <Grid item >
                                <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}>Discount</h4>
                            </Grid>
                            <Grid item>
                                <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}> ₹{discount}</h4>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} justify="space-around">
                            <Grid item>
                                <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}>Total Amount</h4>
                            </Grid>
                            <Grid item>
                                <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}> ₹{amount-discount}</h4>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Cart;
