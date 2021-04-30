import React,{useContext, useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Alert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';

import {addOrder} from "../actions/actions";

import CheckoutItem from '../Components/CheckoutItem';

import {AppContext} from '../AppContext';
import axios from '../axios'

const useStyles = makeStyles({
    paper:{
        width:'80vw',
        height:'5vh',
        backgroundColor: '#009933',
        color:'white',
        paddingTop:'1vh',
        fontFamily: `'IBM Plex Serif',serif`,
        fontSize:'30px'
    }
});

const Checkout= (props)=> {

    console.log(props);

    const {state,dispatch}= useContext(AppContext);

    const classes= useStyles();

    const [selectedValue, setSelectedValue] = useState(null);

    const [openAlert, setOpenAlert] = useState(false);

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
      console.log(selectedValue);
    };

    const onSubmit= async(e)=>{
        e.preventDefault();
        console.log(props.amount);

        const formValues= {
            emailOfUser: state.auth.user.email,
            typeOfPayment: selectedValue,
            amount: props.amount,
            products: Object.values(state.cart).map((item)=>{
                return {
                    product: item._id,
                    quantity: item.quantity
                }
            }) 
        }

        try{
            const response= await axios.post(`/order/${state.auth.user._id}`,formValues);
            dispatch(addOrder(response.data));
            setOpenAlert(true);
        }
        catch(e){
            alert('Error in Order');
        }
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
                        color="primary"
                    />
                     <label>Cash on Delivery</label>

                    <Radio
                        className={classes.radio}
                        checked={selectedValue === 'online'}
                        onChange={handleChange}
                        value="online"
                        name="payment"
                        color="primary"
                    />
                     <label>Online using Razorpay</label>
                     <br/>

                    {
                        !openAlert && (
                            <Button disabled={!selectedValue?true:false} type="Submit" variant="contained" color="primary">
                                Proceed
                            </Button>
                        )||

                        openAlert && (
                            <Alert severity="success">
                                Your order has been placed.
                            </Alert>
                        )
                    }
                </form>
                <br/>
            
            </Paper>
        </div>
    );
}

export default Checkout;