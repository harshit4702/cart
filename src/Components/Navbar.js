import React,{useState,useContext, useEffect} from 'react';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import {useHistory, Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import UserButton from './User/UserButton';
import {AppContext} from "../AppContext";

const useStyles = makeStyles((theme) =>
  createStyles({
    search: {
        backgroundColor: '#56b35e',
        fontSize: '18px',
        color: "white",
        height: "40px",
        width: "28vw",
        borderRadius: '8px',
        marginLeft: '-95vw',
        border: '2px',
        outline: 'none',
        '&::placeholder': {
            color:'white',
            opacity: 0.5
        }
    },
    personIcon_desktop: {
        cursor: 'pointer',
        marginLeft: "33vw",
        fontSize: '30px'
    },
    personIcon_mobile:{
        marginLeft: "5vw",
        fontSize: '20px'
    },
    userButton_mobile:{
        marginLeft: "35vw",
    },
    userButton_desktop:{
        marginLeft: "10vw",
    },
    logo_desktop:{
        border:'2px white solid',
        borderRadius:'40px',
        width:'57px',
        height:'55px'
    },
    logo_mobile:{
        border:'2px white solid',
        borderRadius:'40px',
        marginLeft: '10vw',
        width:'50px',
        height:'50px'  
    },
    cart_desktop: {
        cursor: 'pointer',
        marginLeft: "5vw",
        fontSize: '30px'
    },
    cart_mobile:{
        cursor: 'pointer',
        marginLeft: "5vw",
        fontSize: '4vh'
    },
    lock:{
        cursor: 'pointer',
        fontSize: '15px',
        marginTop:'2vh'
    }
  })
);

const Navbar= ()=> {

    const {state,dispatch}=  useContext(AppContext);

    const history= useHistory();

    const [text,setText]= useState('');
    const [val,setVal]= useState(0);

    useEffect(async()=>{
        var x=0;
        await Object.values(state.cart).map((item)=>{
            x= x+parseInt(item.quantity)
        });
        setVal(x);
    },[state.cart]);

    const onInputChange= (e)=>{
        console.log(e.target.value);
        setText(e.target.value)
    }

    const classes = useStyles();

    return (
        <div >
            <AppBar className={classes.root} color="primary" position="static">
                <Toolbar>
                    <Grid container>
                        <Grid item xs={12}>
                            <div style={{ width: '100%' }}>
                                <Box display="flex" p={1} >
                                    <Box p={1} flexGrow={1}>
                                        <IconButton  style={{marginLeft: '-35vw'}}  edge="start" color="inherit">
                                            <Link to='/' >
                                                <img src="/images/logo.jpg" className={state.mobileView?classes.logo_mobile:classes.logo_desktop}/>
                                            </Link>
                                        </IconButton>
                                    </Box>
                                    <Box p={1} flexShrink={0} style={{marginLeft:'25vw',marginTop:'3vh'}}>
                                        <Grid container>
                                            <Grid item>
                                                {
                                                    !state.mobileView && (
                                                            <input className={classes.search} placeholder="Search" name="search" id="search" value={text} onChange={onInputChange}/>
                                                    )
                                                }
                                            </Grid>
                                            <Grid item style={{marginLeft: '-12vw'}}>
                                                <UserButton />
                                            </Grid>
                                            <Grid item>
                                                <ShoppingCartOutlinedIcon className={state.mobileView?classes.cart_mobile:classes.cart_desktop} onClick={()=>history.push('/cart')} />
                                                {
                                                    !state.auth.isSignedIn && (
                                                        <LockOutlinedIcon className={classes.lock} onClick={()=>history.push('/cart')} />
                                                    )||

                                                    state.auth.isSignedIn && (
                                                        <>{val}</>
                                                    )
                                                }
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </div>
                        </Grid>
                        <Grid item>
                            {
                                state.mobileView && (
                                    <div style={{marginTop:'-2vh',marginBottom:'2vh'}}> 
                                        <input style={{border:'1px solid black',borderRadius:'5px',width:'93vw',height:'6vh'}} placeholder="search" name="search" id="search" value={text} onChange={onInputChange}/>
                                    </div>
                                )
                            }
                        </Grid>
                    </Grid>
                    
                </Toolbar>
                
            </AppBar>
        </div>
    );
}

export default Navbar;