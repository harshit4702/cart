import React from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import {AppContext} from '../AppContext';
 

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalUI = (props)=>{

   const {state,dispatch}= React.useContext(AppContext);
   console.log(props);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (

    <div style={{width: state.mobileView?'76vw':'50vw',marginTop:'30vh',marginLeft:state.mobileView?'1vw':'23vw'}} className={classes.paper}>
        <h2 id="simple-modal-title">Submit</h2>
        <hr />
        <p id="simple-modal-description">
            Are you sure you want to remove the item from the cart?
        </p>
        <div style={{textAlign:'right'}}>
            <Button variant="contained" color="primary" onClick={async()=> {dispatch(await props.action(state.auth.user.cart,props.id));handleClose()}}>
                Yes
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose} >
                No
            </Button>
        </div>
    </div>
  );

  return (
    <div>
      <Button style={{visibility:'hidden'}} id={`cartButton${props.id}`} variant="contained" color="primary" onClick={handleOpen}>
        End Quiz
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default ModalUI;