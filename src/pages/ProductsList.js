import React,{useState,useEffect,useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import {AppContext} from '../AppContext';
import Card from '../Components/Card';
import Filter from '../Components/Filter';
import { makeStyles } from '@material-ui/core';

import axios from '../axios';


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

    const [data,setData]= useState(null)

    useEffect(()=>{

        const fetchProd= async()=>{
            setLoadingComplete(false);
            var querySorting=null;
            var filter= state.filter.name
            var response;

            if(filter){
                if(filter=="ascendingName")
                    querySorting={'name':1};
                else if(filter=="descendingName")
                    querySorting={'name':-1};
                else if(filter=="ascendingPrice")
                    querySorting={'price':1};
                else if(filter=="descendingPrice")
                    querySorting={'price':-1};
            }

            if(state.isFilteredCategoryPresent)
                response= await axios.get(`/product/filter`,{params:{search: state.filteredSubCategories,sorting: querySorting}});
            else
                response= await axios.get(`/product/filter`,{params:{search: "all",sorting: querySorting}});

            setData(response.data);

            setLoadingComplete(true);
        }

        fetchProd();

        
    },[state.filteredSubCategories,state.filter.name]);

    if(!state.filteredSubCategories)

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
                        data && loadingComplete && data.map((item,index)=>{

                            return (
                                <Grid item  key={index} >
                                    <Link to={`/product/${item._id}`}>
                                        <Card product={item} />
                                    </Link>
                                </Grid>
                            );
                        })||

                        !data || !loadingComplete && (

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