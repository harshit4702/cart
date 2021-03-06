import React,{useState,useContext} from 'react';
import {useParams} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import {AppContext} from "../AppContext";

import {productImageData} from '../helpers/productImageData';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    mainBox:{
        width:'40vw',
        height:'65vh',
        border:'1px solid white',
        backgroundColor: 'white'
    },
    mainBoxMobile:{
        width:'90vw',
        height:'45vh',
        border:'1px solid white',
        backgroundColor: 'white'
        
    },
    box:{
        width:'45px',
        height:'45px',
        border:'1px solid black',
        backgroundColor: 'white'
    },
    boxImage:{
        width:'40px',
        height:'40px',
        marginTop:'2px'
    }
}));


const Image= ()=>{

    const {state, dispatch}= useContext(AppContext);

    const params=useParams();

    console.log(params.id);

    const classes = useStyles();

    const [index,setIndex]= useState(params.id==1?0:1);

    const data= productImageData();
    console.log(data);

    return (
        <div className={state.mobileView?classes.mainBoxMobile:classes.mainBox}>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Grid container spacing={3} direction="column"> 
                        <Grid item sm={2}>
                            <div className={classes.box} onClick={()=>setIndex(0)}>
                                <img src={data[0]} className={classes.boxImage}/> 
                            </div>    
                        </Grid>
                        <Grid item sm={2}>
                            <div className={classes.box} onClick={()=>setIndex(1)}>
                                <img src={data[1]} className={classes.boxImage}/> 
                            </div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className={classes.box} onClick={()=>setIndex(2)}>
                                <img src={data[2]} className={classes.boxImage}/> 
                            </div>    
                        </Grid>
                        <Grid item sm={2}>
                            <div className={classes.box} onClick={()=>setIndex(3)}>
                                <img src={data[3]} className={classes.boxImage}/> 
                            </div>    
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    <img src={data[index]} style={{width:state.mobileView?'70vw':'30vw',height:state.mobileView?'40vh':'60vh',marginTop:'2vh'}}/>     
                </Grid>
            </Grid>
        </div>
    )
}

export default Image