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

const useStyles = makeStyles({
    ppr_desk: {
        left: 0,
        right: 0,
        marginLeft:'14vw',
        marginRight: '14vw',
        paddingBottom:'4vh',
        paddingTop:'4vh'
    },
    ppr_mobile: {
        left: 0,
        right: 0,
        maxWidth: '100vw',
        marginLeft:'1vw',
        marginRight: '1vw',
        paddingBottom:'4vh',
        paddingTop:'5vh'
    },
    start_desk: {
        textAlign: 'left', 
        marginLeft: '8vw'
    },
    start_mobile: {
        marginLeft: '-3vw'
    },
    txt_desk: {
        display: 'inline-block',
        cursor: 'pointer',
        color: '#009933',
        marginLeft: '12.5vw',
        padding: '1vw'
    },
    txt_mobile: {
        display: 'inline-block',
        cursor: 'pointer',
        color: '#009933',
        padding: '-1vh'
    },
    btn_desk: {
        paddingLeft: '2.5vw',
        paddingRight: '2.5vw',
        paddingTop: '1.7vh',
        paddingBottom: '1.6vh',
        marginLeft: '3vw',
        fontSize: '14px',
        color: 'white'
    },
    btn_mobile: {
        marginLeft: '2vw',
        marginTop: '1.4vh',
        fontSize: '12px',
        color: 'white'
    },
    adjust_desk: {
        textAlign: 'left' ,
        marginLeft: '21vw' ,
        marginTop: '-5vh'
    },
    nouse_desk:{
        width: '25vw',
        backgroundColor: '#f0f5f1'
    },
    nouse_mobile:{
        backgroundColor: '#f0f5f1',
        marginTop: '-.15vh'
    },
    field_desk: {
        width: '25vw',
    },
    theme: {
        borderColor: '#009933'
    }
});
  
const theme = createMuiTheme({
    palette: {
        primary: green
    },
});

const MyProfile = ()=> {

    const classes = useStyles();

    const [permit1,setpermit1]= useState(false);
    const [permit2,setpermit2]= useState(false);
    const [permit3,setpermit3]= useState(false);
    const [permit4,setpermit4]= useState(false);

    const {state,dispatch}= useContext(AppContext);

    return (
        <Paper className={state.mobileView ? classes.ppr_mobile : classes.ppr_desk} >
            <h2>Personal Information</h2>
            <h3 className={state.mobileView ? classes.start_mobile : classes.start_desk}>Enter Name</h3>
            {
                !permit1 && (
                    <div className={state.mobileView ? classes.adjust_mobile : classes.adjust_desk}>
                        <h4 className={state.mobileView ? classes.txt_mobile : classes.txt_desk} onClick={()=> {setpermit1(true)}}>Edit</h4 >
                        <br></br>
                        <TextField
                            className={state.mobileView ? classes.nouse_mobile : classes.nouse_desk}
                            disabled
                            margin= {state.mobileView ? "dense" : ""}   
                            id="outlined-disabled"
                            label=""
                            defaultValue=""
                            variant="outlined"
                        />
                    </div>
                ) || 

                permit1 && (
                    <div className={state.mobileView ? classes.adjust_mobile : classes.adjust_desk}> 
                        <h4 className={state.mobileView ? classes.txt_mobile : classes.txt_desk } onClick={()=> {setpermit1(false)}}>Cancel</h4 >
                        <br></br>
                        <ThemeProvider theme={theme}>
                            <TextField
                                className={state.mobileView ? classes.field_mobile : classes.field_desk}
                                margin= {state.mobileView ? "dense" : ""}   
                                label="Enter Full Name"
                                variant="outlined"
                                id="mui-theme-provider-outlined-input"
                            />
                            <Button className={state.mobileView ? classes.btn_mobile : classes.btn_desk} variant="contained" color="primary" >
                                Save
                            </Button>
                        </ThemeProvider>                          
                    </div>
                )
            } 
            
            <br></br>
            
            <h3 className={state.mobileView ? classes.start_mobile : classes.start_desk}>Enter Email</h3>
            {
                !permit2 && (
                    <div className={state.mobileView ? classes.adjust_mobile : classes.adjust_desk}>
                        <h4 className={state.mobileView ? classes.txt_mobile : classes.txt_desk} onClick={()=> {setpermit2(true)}}>Edit</h4 >
                        <br></br>
                        <TextField
                            disabled
                            className={state.mobileView ? classes.nouse_mobile : classes.nouse_desk}
                            margin= {state.mobileView ? "dense" : ""} 
                            id="outlined-disabled"
                            label=""
                            defaultValue=""
                            variant="outlined"
                        />
                    </div>
                ) || 

                permit2 && (
                    <div className={state.mobileView ? classes.adjust_mobile : classes.adjust_desk}>
                        <h4 className={state.mobileView ? classes.txt_mobile : classes.txt_desk} onClick={()=> {setpermit2(false)}}>Cancel</h4 >
                        <br></br>
                        <ThemeProvider theme={theme}>
                            <TextField
                                className={state.mobileView ? classes.field_mobile : classes.field_desk}  
                                margin= {state.mobileView ? "dense" : ""}      
                                label="Enter Email"
                                variant="outlined"
                                id="mui-theme-provider-outlined-input"
                            />
                             <Button className={state.mobileView ? classes.btn_mobile : classes.btn_desk} variant="contained" color="primary" >
                                Save
                            </Button>
                        </ThemeProvider>                          
                    </div>
                )
            }
            
            <br></br>
            <h3 className={state.mobileView ? classes.start_mobile : classes.start_desk}>Mobile Number</h3>
            {
                !permit4 && (
                    <div className={state.mobileView ? classes.adjust_mobile : classes.adjust_desk}>
                        <h4 className={state.mobileView ? classes.txt_mobile : classes.txt_desk} onClick={()=> {setpermit4(true)}}>Edit</h4 >
                        <br></br>
                        <TextField
                            disabled
                            className={state.mobileView ? classes.nouse_mobile : classes.nouse_desk}
                            margin= {state.mobileView ? "dense" : ""}      
                            id="outlined-disabled"
                            label=""
                            defaultValue=""
                            variant="outlined"
                        />
                    </div>
                ) || 

                permit4 && (
                    <div className={state.mobileView ? classes.adjust_mobile : classes.adjust_desk}>
                        <h4 className={state.mobileView ? classes.txt_mobile : classes.txt_desk} onClick={()=> {setpermit4(false)}}>Cancel</h4 >
                        <br></br>
                        <ThemeProvider theme={theme}>
                            <TextField
                                className={state.mobileView ? classes.field_mobile : classes.field_desk}    
                                margin= {state.mobileView ? "dense" : ""}      
                                label="Enter Mobile Number"
                                variant="outlined"
                                id="mui-theme-provider-outlined-input"
                            />
                             <Button className={state.mobileView ? classes.btn_mobile : classes.btn_desk} variant="contained" color="primary" >
                                Save
                            </Button>
                        </ThemeProvider>                          
                    </div>
                )
            }
            <br></br>
            <h3 className={state.mobileView ? classes.start_mobile : classes.start_desk}>Delivery Address</h3>
            {
                !permit3 && (
                    <div className={state.mobileView ? classes.adjust_mobile : classes.adjust_desk}>
                        <h4 className={state.mobileView ? classes.txt_mobile : classes.txt_desk} onClick={()=> {setpermit3(true)}}>Edit</h4 >
                        <br></br>
                        <TextField
                            disabled
                            className={state.mobileView ? classes.nouse_mobile : classes.nouse_desk}
                            margin= {state.mobileView ? "dense" : ""}      
                            id="outlined-disabled"
                            label=""
                            defaultValue=""
                            variant="outlined"
                        />
                    </div>
                ) || 

                permit3 && (
                    <div className={state.mobileView ? classes.adjust_mobile : classes.adjust_desk}>
                        <h4 className={state.mobileView ? classes.txt_mobile : classes.txt_desk} onClick={()=> {setpermit3(false)}}>Cancel</h4 >
                        <br></br>
                        <ThemeProvider theme={theme}>
                            <TextField
                                className={state.mobileView ? classes.field_mobile : classes.field_desk}       
                                margin= {state.mobileView ? "dense" : ""}      
                                label="Enter Address"
                                multiline
                                variant="outlined"
                                id="mui-theme-provider-outlined-input"
                            />
                             <Button className={state.mobileView ? classes.btn_mobile : classes.btn_desk} variant="contained" color="primary" >
                                Save
                            </Button>
                        </ThemeProvider>                          
                    </div>
                )
            }
            <br ></br>
            <h3 style={{textAlign: 'left' , margin: '5vh'}}>FAQs</h3>
            <div style={{textAlign: 'left' , margin: '5vh'}}>
                <h4> What happens when I update my email address (or mobile number)?</h4>
                <div style={{ marginLeft: '3vh'}}>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</div>

                <h4>When will my account be updated with the new email address (or mobile number)?</h4>
                <div style={{ marginLeft: '3vh'}}>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</div>

                <h4>What happens to my existing account when I update my email address (or mobile number)?</h4>
                <div style={{ marginLeft: '3vh'}}>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</div>

                <h4>Does my Seller account get affected when I update my email address?</h4>
                <div style={{ marginLeft: '3vh'}}>It has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</div>
            </div>

        </Paper>
    );
}


export default MyProfile;

