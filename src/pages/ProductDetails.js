import React,{useState,useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import {AppContext} from "../AppContext";
import {cartValue,addCartItem} from '../actions/actions';
import Image from "../Components/Image";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

const ProductDetails= ()=> {

    const classes= useStyles();

    const {state,dispatch}= useContext(AppContext);

    const params= useParams();

    console.log(params);

    const [val,setVal]= useState(0);

    useEffect(async()=>{
        if(state.cart[params.id])
            await setVal(state.cart[params.id].value);
    },[state.cart])

    const onClick= async()=>{
        dispatch(await addCartItem(state.auth.user.cart,{productId:params.id,quantity:1}));
    }

    if(!state.cart || !state.products)
        return <>Loading...</>

    const product= state.products[params.id];

    return (
        <div>
            <Paper style={{margin:'4vh',paddingBottom:'4vh',paddingTop:'4vh'}}>
                <Grid container spacing={1} justify="space-around"> 
                    <Grid item sm={5}>
                        <Grid container spacing={3} direction="column">
                            <Grid item>
                                <Image product={product}/>
                            </Grid>
                            {
                                state.auth.isSignedIn && (
                                    <Grid item style={{marginLeft:state.mobileView?'5vw':'5vw'}}>
                                        <Grid container spacing={3}>
                                            <Grid item sm={6}>
                                                <Button style={{width:state.mobileView?'80vw':'15vw'}} variant="contained" color="primary" disabled={state.cart[params.id]?true:false} onClick={onClick}>
                                                    Add to Chart
                                                </Button>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <Button style={{width:state.mobileView?'80vw':'15vw'}} variant="contained" color="secondary">
                                                    Buy Now
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Grid>
                    <Grid item sm={5} style={{textAlign:'left',padding:'3vh'}}>
                        
                        <Typography variant="h5" component="h5" style={{color:'Background',fontFamily:'serif'}}>
                            {product.name}
                        </Typography>
                
                        <br/>
                        <p>
                        
                            Extra ₹{product.discount} off<br/>
                            <h1 style={{display:'inline'}}>
                                ₹{parseInt(product.price) - parseInt(product.discount)}
                            </h1>
                            <p style={{fontSize:'15px',color:'grey',display:'inline'}}> <del>₹{product.price}</del> ₹{product.discount} off </p>
                        </p>
                        <h5>
                            Description
                        </h5>
                        <p style={{textAlign:'justify',color:'grey'}}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default ProductDetails;
