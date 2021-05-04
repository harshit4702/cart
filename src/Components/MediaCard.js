import React,{useState,useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import {AppContext} from '../AppContext';

const useStyles = makeStyles({
  rootDesktop: {
    width: '15vw',
    height: '30vh',
    padding:'2px',
    margin:'1vh',
    textAlign:'center'
  },
  rootMobile: {
    width: '60vw',
    height: '32vh',
    padding:'2px',
    margin:'1vh'
  },
  cardDesktop:{
    width:'15vw',
    height:'20vh'
  },
  cardMobile:{
    width:'80vw',
    height:'22vh'
  }
});

export default function ImgMediaCard(props) {

  const {state,dispatch}= useContext(AppContext);

  const classes = useStyles();

  if(!state.products)
    return <>Loading...</>;

  return (
        <div >
          <Card className={state.mobileView?classes.rootMobile:classes.rootDesktop} >
            <div style={{textAlign:'center'}}>
              <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={state.mobileView?classes.cardMobile:classes.cardDesktop}
                    image={`/product/photos/${props.product._id}/0`}
                    title="Contemplative Reptile"
                  />
                <CardContent>
                  <Typography  component="h2">
                  {props.product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Extra {props.product.discount} % off <br></br></strong>
                    ₹{props.product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </div>
          </Card>
        </div>

    );
}