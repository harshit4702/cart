import React,{useState,useContext} from 'react';
import { fade,createStyles, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import TextField from '@material-ui/core/TextField';

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
    cart_desktop: {
        cursor: 'pointer',
        paddingLeft: "33vw"
    },
    cart_mobile:{
        cursor: 'pointer',
        paddingLeft: "5vw"
    }
  }),
);

const Navbar= ()=> {

    const {state}=  useContext(AppContext);

    const [text,setText]= useState('');

    const onInputChange= (e)=>{
        console.log(e.target.value);
        setText(e.target.value)
    }

    const classes = useStyles();

    return (
        <div >
            <AppBar className={classes.root} color="primary" position="static">
                <Toolbar>
                    <IconButton edge="start"color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.spacing} variant="h6">
                        News
                    </Typography>
                    <input className={`${classes.spacing} ${classes.search}`} placeholder="Search" name="search" id="search" value={text} onChange={onInputChange}/>
                    <ShoppingCartOutlinedIcon className={state.mobileView?classes.cart_mobile:classes.cart_desktop} onClick={()=>console.log('Cart Clicked')} />
                </Toolbar>
            </AppBar>

        </div>
    );
}

export default Navbar;