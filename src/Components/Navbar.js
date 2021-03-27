import React,{useState,useContext, useEffect} from 'react';
import { fade,createStyles, makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonIcon from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';
import LoginAlert from './LoginAlert' ;
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
    login_desktop: {
        cursor: 'pointer',
        marginLeft: "33vw",
        fontSize: '10px'
    },
    login_mobile:{
        marginLeft: "5vw",
        fontSize: '10px'
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
    
    const [alertopen, setalertOpen] = React.useState(false);

    const handleAlertClickOpen = () => {
        console.log('Func invoked state open');
      setalertOpen(true);
    };
  
    const handleAlertClose = () => {
        console.log('Func invoked state close chng');
      setalertOpen(false);
    };

    useEffect(async()=>{
        var x=0;
        await Object.values(state.cart).map((item)=>{
            x= x+item.value
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
                    <IconButton edge="start"color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <input className={`${classes.spacing} ${classes.search}`} placeholder="Search" name="search" id="search" value={text} onChange={onInputChange}/>
                    {
                        state.auth.isSignedIn && (
                            <PersonIcon  className={state.mobileView?classes.personIcon_mobile:classes.personIcon_desktop}/>
                        )
                    }
                    {
                        !state.auth.isSignedIn && (
                            <h6 className={state.mobileView?classes.login_mobile:classes.login_desktop} onClick={handleAlertClickOpen}>Login</h6>
                        )
                    }
                    <ShoppingCartOutlinedIcon className={state.mobileView?classes.cart_mobile:classes.cart_desktop} onClick={()=>history.push('/cart')} />
                    <h5>{val}</h5>
                </Toolbar>
                <LoginAlert handleClose={handleAlertClose} handleClickOpen={handleAlertClickOpen} alertopen={alertopen} />
            </AppBar>
        </div>
    );
}

export default Navbar;