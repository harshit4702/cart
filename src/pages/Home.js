import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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
        <div className={classes.handle} style={{overflowX:'scroll'}} >
          { 
            state.products && Object.values(state.products).map((item,index)=>{
              return (
                <Link to={`/product/${item._id}`}>
                  <MediaCard product={item}/>
                </Link>
              );
            })
          }
        </div>
        <br/>
        <RowImages />
    </div>
  );
}

export default Home;
