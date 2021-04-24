import React,{useContext, useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Radio from '@material-ui/core/Radio';

import CheckoutItem from '../Components/CheckoutItem';

import {AppContext} from '../AppContext';

const useStyles = makeStyles({
    paper:{
        width:'80vw',
        height:'5vh',
        backgroundColor: '#009933',
        color:'white',
        paddingTop:'1vh',
        fontFamily: `'IBM Plex Serif',serif`,
        fontSize:'30px'
    },
    radio:{
        color:'green'
    }
});

const Checkout= (props)=> {

    console.log(props);

    const {state,dispatch}= useContext(AppContext);

    const classes= useStyles();

    const [selectedValue, setSelectedValue] = useState(null);

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
      console.log(selectedValue);
    };

    const onSubmit= (e)=>{
        e.preventDefault();
        console.log(selectedValue);
    }

    return (
        <div style={{marginTop:'3vh',marginBottom:'3vh',marginLeft:'10vw',marginRight:'10vw'}}>
            <Paper>
                <Paper className={classes.paper}>
                    Order Summary
                </Paper>
                {
                    state.cart && state.cart.length!=0 && (
                        Object.values(state.cart).map((item,index)=>{
                            
                            return (
                                <React.Fragment key={index}>
                                    <br/>
                                    <CheckoutItem ob={item} key={index}/>
                                </React.Fragment>
                            );
                        })
                    )
                }

                <br/><br/>

                <Paper className={classes.paper}>
                    Address
                </Paper>

                <h5>
                    {state.auth.isSignedIn?state.auth.user.address:''}
                </h5>
                {
                    
                }

                <br/><br/>

                <Paper className={classes.paper}>
                    Pay Now
                </Paper>
                <br/>
                
                <form onSubmit={onSubmit}>

                    <Radio
                        className={classes.radio}
                        checked={selectedValue === 'cash'}
                        onChange={handleChange}
                        value="cash"
                        name="payment"
                        color="green"
                        inputProps={{ 'aria-label': 'Cash On Delivery' }}
                    />
                     <label for="Cash On Delivery">Cash on Delivery</label>

                    <Radio
                        className={classes.radio}
                        checked={selectedValue === 'online'}
                        onChange={handleChange}
                        value="online"
                        name="payment"
                        color="green"
                        inputProps={{ 'aria-label': 'Online Using Razorpay' }}
                    />
                     <label for="online">Online using Razorpay</label>
                     <br/>

                    <Button disabled={!selectedValue?true:false} type="Submit" variant="contained" color="primary">
                        Proceed
                    </Button>
                </form>
                <br/>
            
            </Paper>
        </div>
    );
}

export default Checkout;