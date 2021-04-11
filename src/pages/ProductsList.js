import React,{useContext, useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';

import {AppContext} from '../AppContext';
import Card from '../Components/Card';

const ProductsList= (props)=> {

    console.log(props);

    const {state,dispatch}= useContext(AppContext);

    if(!props.list)
        return <>Loading...</>

    return (
        <Grid container spacing={3} justify="center" style={{marginTop:'1vh'}}>
            <br/>
            {
                Object.values(props.list).map((item,index)=>{
                    return (
                        <Grid item>
                            <Link to={`/product/${item._id}`}>
                                <Card key={index} product={item} />
                            </Link>
                        </Grid>
                    );
                })
            }
        </Grid>
    );
}

export default ProductsList;
