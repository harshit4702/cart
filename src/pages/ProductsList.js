import React,{useState,useEffect,useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import {AppContext} from '../AppContext';
import Card from '../Components/Card';
import Filter from '../Components/Filter';
import { fetchFilteredProducts, filteredSubCategories, filteredCategoryPresent } from '../actions/actions';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    loading_desktop:{
        marginTop:'30vh',
        marginLeft:'30vw'
    },
    loading_mobile:{
        marginTop:'10vh',
        marginBottom:'10vh'
    }
}));
const ProductsList= ()=> {

    const classes= useStyles();

    const {state,dispatch}= useContext(AppContext);

    const [loadingComplete,setLoadingComplete]= useState(true);

    useEffect(()=>{

        const fetchProd= async()=>{
            setLoadingComplete(false);
            if(state.isFilteredCategoryPresent)
                dispatch(await fetchFilteredProducts(state.filteredSubCategories))
            else
                dispatch(await fetchFilteredProducts("all"));
            setLoadingComplete(true);
        }

        fetchProd();

        
    },[state.filteredSubCategories]);

    if(!state.filteredProducts ||  !state.filteredSubCategories)
        return (
            <div style={{margin:'15vh'}}>
                Loading...
            </div>
        );
    
    return (
        <Grid container spacing={3} style={{marginTop:'1vh'}} justify="space-around">
            <Grid item lg={3} sm={12}>
                <Filter />
            </Grid>
            <Grid item lg={9} sm={12}>
                <Grid container spacing={3}>
                    <br/>
                    {
                        loadingComplete && Object.values(state.filteredProducts).map((item,index)=>{
                            return (
                                <Grid item  key={index} >
                                    <Link to={`/product/${item._id}`}>
                                        <Card product={item} />
                                    </Link>
                                </Grid>
                            );
                        })||

                        !loadingComplete && (
                            <div className={state.mobileView?classes.loading_mobile: classes.loading_desktop}>
                                <CircularProgress />
                                    Loading...
                            </div> 
                        )
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProductsList;