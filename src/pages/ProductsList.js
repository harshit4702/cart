import React,{useEffect,useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';

import {AppContext} from '../AppContext';
import Card from '../Components/Card';
import Filter from '../Components/Filter';
import { fetchProducts, filteredSubCategories, filteredCategoryPresent } from '../actions/actions';

const ProductsList= ()=> {

    const {state,dispatch}= useContext(AppContext);

    useEffect(()=>{

        const fetchProd= async()=>{
            if(state.isFilteredCategoryPresent)
                dispatch(await fetchProducts(state.filteredSubCategories))
            else
                dispatch(await fetchProducts("all"));
        }

        fetchProd();
        
    },[state.filteredSubCategories]);

    if(!state.products ||  !state.filteredSubCategories)
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
                        Object.values(state.products).map((item,index)=>{
                            return (
                                <Grid item  key={index} >
                                    <Link to={`/product/${item._id}`}>
                                        <Card product={item} />
                                    </Link>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProductsList;