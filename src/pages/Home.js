import React from 'react';
import {Link} from 'react-router-dom';

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
        <Link to="/productDetails" style={{textDecoration:'none',color: 'black'}}>
            <p style={{cursor:'pointer'}}>
                Categories
            </p> 
        </Link>
        <RowImages />
    </div>
  );
}

export default Home;
