import React,{useContext,useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import {AppContext} from '../AppContext';
import _ from 'lodash';

const useStyles = makeStyles({
    description:{
        display: '-webkit-box',
        maxWidth: '80vw',
        '-webkitLineClamp': '3',
        '-webkitBoxOrient': 'vertical',
        overflow: 'hidden'
    }
});

const OrderItem= (props)=>{

    const classes= useStyles();

    const {state,dispatch}= useContext(AppContext);
    console.log(props);
    return (
        <Grid container spacing={1}>
            <Grid item xs={3} style={{marginTop:state.mobileView?'0vh':'2vh'}}>
                <img src={`/product/photos/${props.ob.product._id}/0`} style={{width:state.mobileView?'15vw':'60px',height:state.mobileView?'10vh':'80px'}}/>
            </Grid>
            <Grid item xs={state.mobileView?7:6}>
                <h4 className={classes.description} style={{fontFamily: `'IBM Plex Serif',serif`,color:'black',cursor:'pointer'}}>Status: {props.ob.status}</h4>
                <h4 style={{fontFamily: `'IBM Plex Serif',serif`,color:'black',cursor:'pointer'}}>Expected Date: {props.ob.expectedDate.substring(0,10)}</h4>
            </Grid>
            <Grid item xs={state.mobileView?2:3}>
                <div>
                    <h4 style={{fontFamily: `'IBM Plex Serif',serif`,color:'black',cursor:'pointer'}}>
                        {state.mobileView?'':'Price:'} <strong>₹ {props.ob.product.price}</strong>
                    </h4>
                    <h4 style={{fontFamily: `'IBM Plex Serif',serif`,color:'black',cursor:'pointer'}}>
                        
                        {state.mobileView?'X':'Quantity:'}  {props.ob.quantity}
                    </h4>
                </div>
            </Grid>
        </Grid>
    )
}

export default OrderItem;