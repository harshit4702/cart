import React,{useState,useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {AppContext} from "../AppContext";
import {cartValue} from '../actions/actions';
import Image from "../Components/Image";

const ProductDetails= ()=> {

    const {state,dispatch}= useContext(AppContext);

    const [added,setAdded]= useState(false);

    const onClick= ()=>{
        if(!added)
            dispatch(cartValue(state.cartValue+1));
        setAdded(true);
    }

    return (
        <div style={{marginTop:'2vh',marginBottom:'2vh'}}>
            <Grid container spacing={3}> 
                <Grid item sm={5}>
                    <Grid container spacing={3} direction="column">
                        <Grid item>
                            <Image />
                        </Grid>
                        <Grid item style={{marginLeft:state.mobileView?'10vw':'5vw'}}>
                            <Grid container spacing={3}>
                                <Grid item sm={6}>
                                    <Button variant="contained" color="primary" disabled={added} onClick={onClick}>
                                        Add to Chart
                                    </Button>
                                </Grid>
                                <Grid item sm={6}>
                                    <Button variant="contained" color="secondary">
                                        Buy Now
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={7}>
                    <Typography variant="h4" component="h4" style={{color:'Background',fontFamily:'serif'}}>
                        Samsung Galaxy S4+ Gen 8 + GB Ram
                    </Typography>
                    <h5>
                        ₹12,999 ₹25,00048% off
                    </h5>

                    <p>

                        Available offers <br/>

                        Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit CardT&C<br/>

                        Bank Offer10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition applyT&C<br/>

                        Partner OfferGST Invoice Available! Save up to 28% for business purchases.Know More<br/>

                        No cost EMI ₹1,445/month. Standard EMI also availableView Plans
                    </p>
                </Grid>
            </Grid>
        </div>
    );
}

export default ProductDetails;
