import React,{useState,useContext, useEffect} from 'react';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import {useHistory, Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import UserButton from './User/UserButton';

import {AppContext} from "../AppContext";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      background: '#009933',
    },
    search: {
        backgroundColor: '#56b35e',
        fontSize: '20px',
        color: "white",
        height: "40px",
        width: "24vw",
        borderRadius: '10px',
        border: '2px',
        outline: 'none',
        '&::placeholder': {
            color:'white',
            opacity: 0.5
        }
    },
    spacing:{
        marginLeft: '10vw'
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
        marginLeft: "25vw",
    },
    userButton_desktop:{
        marginLeft: "55vw",
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
        fontSize: '20px'
    }
  }),
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
                    <IconButton edge="start" color="inherit" style={{marginLeft:state.mobileView?'0vw':'5vw'}}>
                        <Link to='/' >
                            <img src="/images/logo.jpg" className={state.mobileView?classes.logo_mobile:classes.logo_desktop}/>
                        </Link>
                    </IconButton>

                    {/*<input className={`${classes.spacing} ${classes.search}`} placeholder="Search" name="search" id="search" value={text} onChange={onInputChange}/>*/}
                    
                    <div className={state.mobileView?classes.userButton_mobile:classes.userButton_desktop}>
                        <UserButton />
                    </div>
                    {
                        state.auth.isSignedIn && (
                            <>
                                <ShoppingCartOutlinedIcon className={state.mobileView?classes.cart_mobile:classes.cart_desktop} onClick={()=>history.push('/cart')} />
                                <h5>{val}</h5>
                            </>
                        )
                    }
                </Toolbar>
                
            </AppBar>
        </div>
    );
}

export default Navbar;