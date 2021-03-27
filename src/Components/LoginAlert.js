import React,{useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
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

import {AppContext} from "../AppContext";
import {auth} from "../actions/actions";

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
    padding: theme.spacing(10),
  },

}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);

export default function LoginAlert(props) {

  let history= useHistory();

  const {state, dispatch}= useContext(AppContext);

  const [validation, setValidation]= useState(false);

  const [emailValue,setEmailValue]= useState("");

  const [passwordValue, setPasswordValue]= useState("");

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
        dispatch(await auth(emailValue,true));
        closeAlert();
        return;
      }
    }

    console.log('Not matched');

    setValidation(true);

  }

  return (
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
                <TextField id="standard-secondary" label="Enter Email" value={emailValue} onChange={onEmailChange} name="email" type="email" color="primary"> </TextField><br></br>
                <TextField id="standard-secondary" label="Enter Password" value={passwordValue} onChange={onPasswordChange} name="password" type="password"  color="primary"> </TextField><br></br>
                <br></br>
                <br></br>
                <Button type="submit" variant="contained" color="primary" >                
                    Sign In
                </Button>
            </form>
        </DialogContent>

        <DialogActions>
          <Typography autoFocus onClick={closeAlert} color="primary">
            New to website ? Create an account .
          </Typography>
        </DialogActions>
      </Dialog>
    </div>
  );
}

