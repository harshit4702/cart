import React,{useContext} from 'react';
import Grid from '@material-ui/core/Grid';

import {AppContext} from '../AppContext';
import {editCartItem, deleteCartItem} from '../actions/actions';
import Modal from '../Components/Modal';

const CartItem= (props)=>{

    const {state,dispatch}= useContext(AppContext);

    const onClick= async(id,val)=>{
        if(val==0)
            document.getElementById(`cartButton${id}`).click();
        else
            dispatch(await editCartItem(id,{value:val}));
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <img src={props.ob.src[0]} style={{width:'10vw',height:state.mobileView?'10vh':'22vh'}}/>
            </Grid>
            <Grid item xs={7}>
                <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}>{props.ob.name}</h4>
            </Grid>
            <Grid item xs={2}>
                <div style={{marginTop:'8vh'}}>
                    <div style={{width:'20px',height:'20px',color:'black',border:'1px solid black',marginLeft:state.mobileView?'':'12px'}}>
                        {props.ob.value}
                    </div>
                    <Grid container spacing={0}>
                        <Grid item>
                            <button style={{width:'22px'}} onClick={async()=>await onClick(props.ob._id,props.ob.value+1)}>+</button>
                        </Grid>
                        <Grid item>
                            <button style={{width:'22px'}} onClick={async()=>await onClick(props.ob._id,props.ob.value-1)}>-</button>
                        </Grid>
                    </Grid> 
                </div>
            </Grid>
            <Modal id={props.ob.id} action={deleteCartItem}/>
        </Grid>
    )
}

export default CartItem;