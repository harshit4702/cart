import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import shuffle from 'shuffle-array';

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
        <br />

        <Paper elevation={3} style={{paddingTop:'1vh'}}>
         
            {
              !state.products && (
                <div style={{padding:'10vh'}}>
                  Loading...
                </div>
              ) || 

              state.products &&  (
                <>
                  <div style={{textAlign:'right',marginRight:'.5vw'}}>
                    <Link to="/category/1">
                      <Button  variant="contained" color="primary">View All</Button>
                    </Link>
                  </div>
                  <hr/>
                  <div style={{width:state.mobileView?'133vw':'110vw',marginLeft:state.mobileView?'-36vw':'-7vw'}} >
                    <ScrollMenu
                      data={shuffle.pick(Object.values(state.products) , {'picks': 7 }).map((product, index) => (
                        <Link to={`/product/${product._id}`} key={index}> 
                          <MediaCard  product={product}/>
                        </Link>
                      ))}    
                    />
                  </div>
                </>
              )
            }
          </Paper>
          <br/>
          <br/>
        <RowImages />
        <br/><br/>
        <Paper elevation={3} style={{paddingTop:'1vh'}}>
         
            {
              !state.products && (
                <div style={{padding:'10vh'}}>
                  Loading...
                </div>
              ) || 

              state.products &&  (
                <>
                  <div style={{textAlign:'right',marginRight:'.5vw'}}>
                    <Link to="/category/1">
                      <Button  variant="contained" color="primary">View All</Button>
                    </Link>
                  </div>
                  <hr/>
                  <div style={{width:state.mobileView?'133vw':'110vw',marginLeft:state.mobileView?'-36vw':'-7vw'}} >
                    <ScrollMenu
                      data={shuffle.pick(Object.values(state.products) , {'picks': 7 }).map((product, index) => (
                        <Link to={`/product/${product._id}`} key={index}> 
                          <MediaCard  product={product}/>
                        </Link>
                      ))}    
                    />
                  </div>
                </>
              )
            }
          </Paper>
          <br/>
          <br/>
    </div>
  );
}

export default Home;
