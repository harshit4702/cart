import React from 'react';
import {Link} from 'react-router-dom';

import Carousel from '../Components/Carousel';
import Categories from '../Components/Categories';

const Home= ()=> {
  return (
    <React.Fragment>
        <p>
            Menu Bar
        </p>
        <Carousel />
        <Link to="/productDetails" style={{textDecoration:'none',color: 'black'}}>
            <p style={{cursor:'pointer'}}>
                Categories
            </p>
            
        </Link>
    </React.Fragment>
  );
}

export default Home;
