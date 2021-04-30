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

const CartItem= (props)=>{

    const classes= useStyles();

    const {state,dispatch}= useContext(AppContext);

    return (
        <Grid container spacing={1}>
            <Grid item xs={3} style={{marginTop:state.mobileView?'4vh':'2vh'}}>
                <img src={`/product/photos/${props.ob._id}/0`} style={{width:state.mobileView?'15vw':'60px',height:state.mobileView?'12vh':'80px'}}/>
            </Grid>
            <Grid item xs={state.mobileView?7:6}>
                <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}>{props.ob.name}</h4>
                <h5 className={classes.description} style={{fontFamily: `'IBM Plex Serif',serif`}}>{props.ob.description}</h5>
            </Grid>
            <Grid item xs={state.mobileView?2:3}>
                <div style={{marginTop:'3vh'}}>
                    <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}>
                        {state.mobileView?'':'Price:'} <strong>₹ {props.ob.price}</strong>
                    </h4>
                    <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}>
                        
                        {state.mobileView?'X':'Quantity:'}  {props.ob.quantity}
                    </h4>
                </div>
            </Grid>
        </Grid>
    )
}

export default CartItem;