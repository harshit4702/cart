import React,{useState, useContext} from 'react';
import {useHistory,Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button' ;
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {AppContext} from "../AppContext";
import {addCartItem, auth, fetchCartItem} from "../actions/actions";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(1),
    color: theme.palette.grey[0],
  },
});

const useStyles = makeStyles((theme) => ({

  textField: {
    width: '226px',
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(7),
  },

}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);

export default function LoginAlert(props) {
  const myClasses = useStyles();
  let history= useHistory();

  const {state, dispatch}= useContext(AppContext);

  const [validation, setValidation]= useState(false);

  const [emailValue,setEmailValue]= useState("");

  const [passwordValue, setPasswordValue]= useState("");

  const [openLogin,setOpenLogin]= useState(true);


  const closeAlert = () => {
      props.handleClose();
  };

  const onEmailChange= (e)=>{
    setEmailValue(e.target.value);
  }

  const onPasswordChange= (e)=>{
    setPasswordValue(e.target.value);
  }

  const onSubmit= async(e)=>{
    e.preventDefault();
    if(state.users[emailValue]){
      if(state.users[emailValue].password==passwordValue){
        console.log('matched');
        setValidation(false);
        console.log(state.users[emailValue]._id)
        dispatch(await auth(state.users[emailValue],true));
        dispatch(await fetchCartItem(state.users[emailValue].cart));
        closeAlert();
        return;
      }
    }

    console.log('Not matched');

    setValidation(true);
  }

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };




  const show = ()=>{
    if(openLogin)
      return  (
        <div>
        <Dialog onClose={closeAlert} aria-labelledby="customized-dialog-title" open={props.alertopen}>
          <DialogTitle id="customized-dialog-title" onClose={closeAlert}>
            Login
          </DialogTitle>
  
          <DialogContent dividers>
              <form onSubmit={onSubmit}>         
                  {
                    validation && (
                      <h6 style={{color:'red'}}>Email or Password doesn't match</h6>
                    )
                  }
                  <TextField id="standard-secondary" label="Enter Email" style={{width: '226px'}} value={emailValue} onChange={onEmailChange} name="email" type="email" color="primary"> </TextField><br></br>
                  <br></br>
                  <TextField id="standard-secondary" label="Enter Password" style={{width: '226px'}} value={passwordValue} onChange={onPasswordChange} name="password" type="password"  color="primary"> </TextField><br></br>
                  <br></br>
                  <br></br>
                  <Button type="submit" variant="contained" color="primary" >                
                      Sign In
                  </Button>
              </form>
          </DialogContent>
  
          <DialogActions>
            <Typography autoFocus onClick={closeAlert} color="primary">
              New to website ?
            </Typography>
            <p onClick={()=>setOpenLogin(false)}> Sign Up</p>
          </DialogActions>
        </Dialog>
      </div>
      );

    return (
      <div>
        <Dialog onClose={ ()=>{closeAlert(); setOpenLogin(true)} } aria-labelledby="customized-dialog-title" open={props.alertopen}>
          <DialogTitle id="customized-dialog-title" onClose={ ()=>{closeAlert(); setOpenLogin(true)} }>
            Sign Up
          </DialogTitle>

          <DialogContent dividers>
              {/* <form onSubmit={onSubmit}>         
                  {
                    validation && (
                      <h6 style={{color:'red'}}>Email or Password doesn't match</h6>
                    )
                  } */}
                  <TextField id="standard-secondary" label="Enter Email" value={emailValue} style={{width: '226px'}} onChange={onEmailChange } name="email" type="email" color="primary"> </TextField><br></br>
                  <br></br>
                  <TextField id="standard-secondary" label="Enter Password" value={passwordValue} style={{width: '226px'}} onChange={onPasswordChange} name="password" type="password"  color="primary"> </TextField><br></br>
                  <br></br>
                  <FormControl className={clsx(myClasses.textField)}>
                  <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  </FormControl>
                  <br></br>
                  <br></br>
                  <br></br>

                  <Button type="submit" variant="contained" color="primary" >                
                      Sign Up
                  </Button>
              {/* </form> */}
          </DialogContent>
  
          <DialogActions>
            {/* <Typography autoFocus onClick={closeAlert} color="primary">
              New to website ?
            </Typography> */}
            <p onClick={()=>setOpenLogin(true)}> Log In</p>
          </DialogActions>
        </Dialog>
      </div>
      );
    }
    
    return (
        <div >
                {show()}
        </div>
      );
}