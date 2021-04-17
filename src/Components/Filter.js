import React,{useContext, useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

import {AppContext} from '../AppContext';

const useStyles = makeStyles({
    checkBox:{
        color:'green'
    },
    radio:{
        color:'green'
    }
});

const Filter= ()=> {

    const classes= useStyles();

    const {state,dispatch}= useContext(AppContext);

    const [checkBoxCategories, setCheckBoxCategories] = useState(null);

    const [checker, setChecker] = useState(false);

    const [checkBoxSubCategories, setCheckBoxSubCategories] = useState(null);

    const [selectedValue, setSelectedValue] = useState({
        name: 'ascending',
        price: 'ascending'
    });

    useEffect(()=>{
        if(state.categories){
            var z={};
           var flag=true; 
            Object.values(state.categories).map((item)=>{
                z= {...z,[item._id] : flag}
                flag=false;
            });
            setCheckBoxCategories(z);
        }

    },[state.categories]);

    useEffect(()=>{
        
        if(checkBoxCategories && state.categories){
            var z={};
            var flag= true;
            Object.values(state.categories).map((item)=>{
                if(checkBoxCategories[item._id]){
                    item.subCategories.map((subItem)=>{
                        z= {...z,[subItem._id] : flag}
                        flag=false;
                    })
                }
            });
            console.log(checkBoxCategories);
            setCheckBoxSubCategories(z);
            setChecker(true);
        }

    },[checkBoxCategories]);

    console.log(checkBoxCategories);
    console.log(checkBoxSubCategories);

    const handleChange = (event) => {
      setSelectedValue({...selectedValue, [event.target.name]:event.target.value});
      console.log(selectedValue);
    };
    
    const handleChangeCategories = (event) => {
        setCheckBoxCategories({ ...checkBoxCategories, [event.target.name]: event.target.checked });
        setChecker(false);
    };

    const handleChangeSubCategories = (event) => {
        setCheckBoxSubCategories({ ...checkBoxSubCategories, [event.target.name]: event.target.checked });
    };

    if(!checkBoxCategories || !state.categories || !checkBoxSubCategories || !checker)
        return (
            <div style={{margin:'15vh'}}>
                Loading...
            </div>
        );

    
    const data = state.categories;
    

    return (
        <Paper style={{padding:'2vh',textAlign:'left'}}>
            <h5>Filter</h5><hr/>
            <Grid container direction direction="column">
                <Grid item>
                    <p>Categories</p>
                    <Grid container spacing={1} style={{height:state.mobileView?'20vh':'20vh',overflowY:'auto',marginBottom:'2vh'}}>
                        {
                            Object.values(data).map((ob)=>(
                                <Grid item >
                                    <Checkbox
                                        className={classes.checkBox}
                                        checked={checkBoxCategories[ob._id]}
                                        onChange={handleChangeCategories}
                                        name={ob._id}
                                        color="green"
                                    />{ob.name}<br/>
                                </Grid>
                            ))
                        }
                        
                    </Grid>
                    <hr/>
                </Grid>


                <Grid item>
                    <p>Sub Categories</p>
                    <Grid container spacing={1} style={{height:state.mobileView?'20vh':'20vh',overflowY:'auto',marginBottom:'2vh'}}>
                        {
                            Object.values(data).map((z)=>{
                                if(checkBoxCategories[z._id]){
                                    return z.subCategories.map((ob)=>(
                                        <Grid item >
                                            <Checkbox
                                                className={classes.checkBox}
                                                checked={checkBoxSubCategories[ob._id]}
                                                onChange={handleChangeSubCategories}
                                                name={ob._id}
                                                color="green"
                                            />{ob.name}<br/>
                                        </Grid>
                                    ))
                                }
                            })
                            
                        }
                    </Grid>
                    <hr/>
                </Grid>
                
                <Grid item>
                    <p>Name</p>
                    
                    <Radio
                        className={classes.radio}
                        checked={selectedValue.name === 'ascending'}
                        onChange={handleChange}
                        value="ascending"
                        name="name"
                        color="green"
                        inputProps={{ 'aria-label': 'A-Z' }}
                    />
                    <label for="A-Z">A-Z</label>

                    <Radio
                        className={classes.radio}
                        checked={selectedValue.name === 'descending'}
                        onChange={handleChange}
                        value="descending"
                        name="name"
                        color="green"
                        inputProps={{ 'aria-label': 'Z-A' }}
                    />
                    <label for="Z-A">Z-A</label>
                    <hr/>
                </Grid>

                <Grid item>
                    <p>Price</p>
                    
                    <Radio
                        className={classes.radio}
                        checked={selectedValue.price === 'ascending'}
                        onChange={handleChange}
                        value="ascending"
                        name="price"
                        color="green"
                        inputProps={{ 'aria-label': 'low' }}
                    />
                    <label for="low">Low to High</label>

                    <Radio
                        className={classes.radio}
                        checked={selectedValue.price === 'descending'}
                        onChange={handleChange}
                        value="descending"
                        name="price"
                        color="green"
                        inputProps={{ 'aria-label': 'high' }}
                    />
                    <label for="high">High to Low</label>
                </Grid>
            </Grid>   

        </Paper>
    );
}

export default Filter;