import React,{useState,useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    maxWidth: 200,
    margin: 6,
    padding: 2
  }
});

export default function ImgMediaCard(props) {

  const classes = useStyles();

  return (
        <div >
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="160"
                image={props.product.src[0]}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography  component="h2">
                {props.product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {props.product.price}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>

    );
}