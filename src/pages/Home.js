import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Carousel from '../Components/Carousel';
import Categories from '../Components/Categories';
import RowImages from '../Components/RowImages';
import {AppContext} from '../AppContext';

const Home= ()=> {

  const {state,dispatch}= useContext(AppContext);

  console.log(state);

  return (
    <div>
        <Carousel />
        <br/>
        <Grid container spacing={3} justify="center" alignContent="space-between" alignItems="center">
        { 
          state.products && Object.values(state.products).map((item,index)=>{
            return (
              <Grid item key={index}>
                <Link to={`/product/${item._id}`} style={{textDecoration:'none',color: 'black'}}>
                  <p style={{cursor:'pointer'}}>
                      Category {item._id}
                  </p> 
                </Link>
              </Grid>
            );
          })
        }
        </Grid>
        <br/>
        <RowImages />
    </div>
  );
}

export default Home;
