import React,{useContext, useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import {AppContext} from '../AppContext';
import {productImageData} from '../helpers/productImageData';
import {editCartItem, deleteCartItem} from '../actions/actions';
import Modal from '../Components/Modal';

const data= productImageData();

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

    const onClick= async(id,val,price)=>{
        if(val==0)
            document.getElementById(`cartButton${id}`).click();
        else
            dispatch(await editCartItem(id,{value:val}));
    };

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
                    <Grid container spacing={1} key={index}>
                        <Grid item xs={3}>
                            <img src={data[2]} style={{width:'10vw',height:state.mobileView?'10vh':'22vh'}}/>
                        </Grid>
                        <Grid item xs={7}>
                            <h4>Samsung Galaxy S4+ Gen 8 + GB Ram {ob.id}</h4>
                        </Grid>
                        <Grid item xs={2}>
                            <div style={{marginTop:'8vh'}}>
                                <div style={{width:'20px',height:'20px',color:'black',border:'1px solid black',marginLeft:state.mobileView?'':'12px'}}>
                                    {ob.value}
                                </div>
                                <Grid container spacing={0}>
                                    <Grid item>
                                        <button style={{width:'22px'}} onClick={async()=>await onClick(ob.id,ob.value+1,ob.price)}>+</button>
                                    </Grid>
                                    <Grid item>
                                        <button style={{width:'22px'}} onClick={async()=>await onClick(ob.id,ob.value-1,-ob.price)}>-</button>
                                    </Grid>
                                </Grid> 
                            </div>
                        </Grid>
                        {console.log(ob.id)}
                        <Modal id={ob.id} action={deleteCartItem}/>
                    </Grid>
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
