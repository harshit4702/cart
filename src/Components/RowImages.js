import React,{useState,useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import {AppContext} from "../AppContext";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    mainBox:{
        
    },
    mainBoxMobile:{
       
        
    },
    box:{
        
    },
    boxImage:{
       width: '32vw',
       height: '28vh'
    },
    boxImageMobile:{
        width: '31vw',
        height: '13vh'
    }
}));


const RowImages= ()=>{

    const {state, dispatch}= useContext(AppContext);

    const classes= useStyles();

    return (
        <Grid container  spacing={0} style={{backgroundColor: '#f0f3f7', marginBottom:'2vh'}}>
            <Grid item xs={4}>
                <Paper elevation={3} style={{padding: '0.5vh'}}>
                    <img src='https://www.volusion.com/blog/content/images/2019/02/Your-DIY-Product-Photography-Resource-Guide.png' className={state.mobileView?classes.boxImageMobile:classes.boxImage}/> 
                </Paper>    
            </Grid>
            <Grid item sm={4}>
                <Paper elevation={3} style={{padding: '0.5vh'}}>
                    <img src='https://static.toiimg.com/photo/72975551.cms' className={state.mobileView?classes.boxImageMobile:classes.boxImage}/> 
                </Paper>
            </Grid>
            <Grid item sm={4}>
                <Paper elevation={3} style={{padding: '0.5vh'}}>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSijVODgOwuCiEAM4CPma4iMMcfkAbp6QzUHovQlBaEJbDkYQHz6OYj9oKQdmNwesImKLY&usqp=CAU' className={state.mobileView?classes.boxImageMobile:classes.boxImage}/>  
                </Paper>    
            </Grid>
        </Grid>
    );
}

export default RowImages;