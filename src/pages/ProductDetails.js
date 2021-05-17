import React,{useState,useContext, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Select from 'react-select';

import {AppContext} from "../AppContext";
import {cartValue,addCartItem} from '../actions/actions';
import Image from "../Components/Image";
import { makeStyles } from '@material-ui/core';
import { queryByTestId } from '@testing-library/dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

const ProductDetails= ()=> {

    const classes= useStyles();

    const {state,dispatch}= useContext(AppContext);

    const params= useParams();
    const history= useHistory();

    console.log(params);

    const [val,setVal]= useState(0);
    const [options,setOptions]= useState([]);
    const[selectedOption, setSelectedOption]= useState({value:'1',label:'Qty.'});

    const [loadComplete, setLoadComplete]= useState(true);

    useEffect(async()=>{
        if(state.cart[params.id])
            await setVal(state.cart[params.id].value);
    },[state.cart])

    useEffect(()=>{
        var op=[];
        for(var i=1;i<=10;i++)
            op.push({value:i,label:i});
        setOptions(op);
    },[]);

    const onClick= async()=>{
        setLoadComplete(false);
        console.log(selectedOption.value)
        dispatch(await addCartItem(state.auth.user.cart,{productId:params.id,quantity:selectedOption.value}));
        setLoadComplete(true);
    }

    const handleChange= (selectedOp)=>{
        setSelectedOption(selectedOp);
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
                            <Grid item>
                                <div style={{textAlign:'left',marginLeft:'6vw',marginBottom:'2vh',width:'150px',height:'20px'}}>
                                    <Select
                                        value={selectedOption}
                                        onChange={handleChange}
                                        options={options}
                                        placeholder="Qty."
                                        menuPlacement="auto"
                                    />
                                </div>
                            </Grid>
                            <Grid item style={{marginLeft:state.mobileView?'5vw':'5vw'}}>
                                <Grid container spacing={3}>
                                    <Grid item sm={6}>
                                        {
                                            loadComplete && (
                                                <Button style={{width:state.mobileView?'80vw':'15vw'}} variant="contained" color="primary" disabled={state.cart[params.id]||!state.auth.isSignedIn?true:false} onClick={onClick}>
                                                    Add to Chart
                                                </Button>
                                            )||

                                            !loadComplete && (
                                                <div>
                                                    Adding to Cart...
                                                </div>
                                            )
                                        }
                                    </Grid>
                                    <Grid item sm={6}>
                                        
                                        <Button onClick={()=>history.push('/cart/checkout',{flag:true,isCart:false,amount:(product.price-product.discount)*selectedOption.value,items:[{...product,quantity: selectedOption.value}]})} style={{width:state.mobileView?'80vw':'15vw'}} variant="contained" color="secondary"disabled={!state.auth.isSignedIn?true:false}>
                                            Buy Now
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
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
                            {product.description}
                        </p>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default ProductDetails;
