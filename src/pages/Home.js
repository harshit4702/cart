import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ScrollMenu from 'react-horizontal-scrolling-menu';

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
              <div style={{width:'100vw'}}>
                <ScrollMenu
                  arrowLeft={state.mobileView?null:(<div style={{ fontSize: "30px"}}>{" < "}</div>)}
                  arrowRight={state.mobileView?null:(<div style={{ fontSize: "30px" }}>{" > "}</div>)}
                  data={Object.values(state.products).map((product, index) => (
                    <Link to={`/product/${product._id}`} key={index}> 
                      <MediaCard  product={product}/>
                    </Link>
                  ))}    
                />
              </div>
            )
          }
          <br/>
          <br/>
        <RowImages />
    </div>
  );
}

export default Home;
