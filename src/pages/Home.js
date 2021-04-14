import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Button from '@material-ui/core/Button';

import ProductsList from './ProductsList';

import Carousel from '../Components/Carousel';
import Categories from '../Components/Categories';
import RowImages from '../Components/RowImages';
import MediaCard from '../Components/MediaCard';

import {AppContext} from '../AppContext';

const useStyles = makeStyles({
  handle: {
    backgroundColor: 'white',
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    margin: 1,
    padding: 1,
    width:'100%',
    float: 'left',
    maxHeight: 300,
    overflowX: 'scroll'
  },
  button:{
    backgroundColor:'#009933',
    '&:hover': {
        backgroundColor: 'white',
        color:'#009933'
    }
  }
});

const Home= ()=> {

  const classes = useStyles();

  const {state,dispatch}= useContext(AppContext);

  console.log(state);

  return (
    <div>
        <Carousel />
        <br/>
          { /*
            state.products && Object.values(state.products).map((item,index)=>{
              return (
                <Link to={`/product/${item._id}`}>
                  <MediaCard product={item}/>
                </Link>
              );
            })
          */}
          <br />
         
          {
            state.products &&  (
              <>
                <div style={{textAlign:'right',marginRight:'.5vw'}}>
                  <Link to="/category/1">
                    <Button  className={classes.button} variant="contained" color="primary">View All</Button>
                  </Link>
                </div>
                <div style={{width:state.mobileView?'133vw':'110vw',marginLeft:state.mobileView?'-36vw':'-7vw'}} >
                  <ScrollMenu
                    data={Object.values(state.products).map((product, index) => (
                      <Link to={`/product/${product._id}`} key={index}> 
                        <MediaCard  product={product}/>
                      </Link>
                    ))}    
                  />
                </div>
              </>
            )
          }
          <br/>
          <br/>
        <RowImages />
    </div>
  );
}

export default Home;
