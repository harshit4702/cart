import React,{useState,useContext, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import {AppContext} from "../AppContext";
import {cartValue,addCartItem} from '../actions/actions';

import {
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { blue,pink,green } from '@material-ui/core/colors';


const theme = createMuiTheme({
    palette: {
        primary: green
    },
});


const MyProfile = ()=> {
    const [permit,setPermit]= useState(false);

    return (
        <Paper style={{marginLeft:'14vh',marginRight: '14vh',paddingBottom:'4vh',paddingTop:'4vh'}}>
            <h3>Personal Information</h3>
            {
                !permit && (
                    <div>
                        <h4 style={{cursor: 'pointer' , color: '#009933'}} onClick={()=> {setPermit(true)}}>Edit</h4>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label=""
                            defaultValue=""
                            variant="outlined"
                        />
                    </div>
                ) || 

                permit && (
                    <div>
                        <h4 style={{cursor: 'pointer' , color: '#009933'}} onClick={()=> {setPermit(false)}}>Cancel</h4>
                        <ThemeProvider theme={theme}>
                            <TextField
                                label="Enter Email"
                                variant="outlined"
                                id="mui-theme-provider-outlined-input"
                            />
                             <Button style={{padding: '12px' , marginTop: '4px', color: 'white'}} variant="contained" color="primary" >
                                Save
                            </Button>
                        </ThemeProvider>                          
                    </div>
                )
            }

        </Paper>
    );
}


export default MyProfile;

