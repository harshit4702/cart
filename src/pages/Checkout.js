import React,{useContext, useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import {AppContext} from '../AppContext';

const useStyles = makeStyles({
    summary:{
        backgroudColor: 'none'
    }
});

const Checkout= ()=> {

    const {state,dispatch}= useContext(AppContext);

    const classes= useStyles();

    console.log(state);

    return (
        <div style={{marginTop:'3vh',marginBottom:'3vh',marginLeft:'10vw',marginRight:'10vw'}}>
            <Paper>
                <div className={classes.summary}>
                    Order Summary
                </div>
            </Paper>
        </div>
    );
}

export default Checkout;
