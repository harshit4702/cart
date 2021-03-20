import React from 'react';
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
    const closeAlert = () => {
        props.handleClose();
    };

  return (
    <div>
      <Dialog onClose={closeAlert} aria-labelledby="customized-dialog-title" open={props.alertopen}>
        <DialogTitle id="customized-dialog-title" onClose={closeAlert}>
          Login
        </DialogTitle>

        <DialogContent dividers>
            <FormControl>         
                <TextField id="standard-secondary" label="Enter Email" color="primary"> </TextField><br></br>
                <TextField id="standard-secondary"  label="Enter Password" color="primary"> </TextField><br></br>
                <br></br>
                <br></br>
                <Button type="submit" variant="contained" color="primary" >                
                    Sign In
                </Button>
            </FormControl>
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

