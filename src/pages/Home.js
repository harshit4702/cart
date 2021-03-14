import React from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Carousel from '../Components/Carousel';
import Categories from '../Components/Categories';
import RowImages from '../Components/RowImages';

const Home= ()=> {
  return (
    <div>
        <p>
            Menu Bar
        </p>
        <Carousel />
        <Grid container spacing={3} justify="center" alignContent="space-between" alignItems="center">
            <Link to="/product/1/100" style={{textDecoration:'none',color: 'black'}}>
              <p style={{cursor:'pointer'}}>
                  Category 1
              </p> 
            </Link>
          
            <Link to="/product/2/300" style={{textDecoration:'none',color: 'black'}}>
              <p style={{cursor:'pointer'}}>
                  Category 2
              </p> 
            </Link>
        </Grid>
        <RowImages />
    </div>
  );
}

export default Home;
