import React,{useContext, useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

import {AppContext} from '../AppContext';
import { filteredSubCategories, filteredCategoryPresent } from '../actions/actions';

const useStyles = makeStyles({
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
            var flag= false;
            var subCategoryIds=[];
            Object.values(state.categories).map((item)=>{
                if(checkBoxCategories[item._id]){
                    flag=true;
                    item.children.map((subItem)=>{
                        z= {...z,[subItem._id] : false}
                        console.log(subItem._id)
                        subCategoryIds.push(subItem._id);
                    })
                }
            });
            console.log(checkBoxCategories);
            dispatch(filteredCategoryPresent(flag));
            setCheckBoxSubCategories(z);
            setChecker(true);
        }

    },[checkBoxCategories]);
    

    useEffect(async()=>{
        if(checkBoxCategories && state.categories){
            var storeAllSubCategoryIds=[];
            var subCategoryIds=[];
            for await (var [key,value] of Object.entries(checkBoxSubCategories)) {
                if(value==true)
                    subCategoryIds.push(key);
    
                storeAllSubCategoryIds.push(key);
            }

            if(subCategoryIds.length==0)
                dispatch(filteredSubCategories(storeAllSubCategoryIds));
            else
                dispatch(filteredSubCategories(subCategoryIds));
        }

    },[checkBoxSubCategories]);

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
        dispatch(filteredSubCategories(checkBoxSubCategories));
    };

    if(!checkBoxCategories || !state.categories || !checkBoxSubCategories || !checker)
        return (
            <div style={{margin:'15vh'}}>
                Loading...
            </div>
        );

    const data = state.categories;

    return (
        <Paper style={{padding:'2vh',textAlign:'left',width:state.mobileView?'100vw':'auto'}}>
            <h5>Filter</h5><hr/>
            <Grid container direction direction="column">
                <Grid item>
                    <p>Categories</p>
                    <Grid container spacing={1} style={{height:state.mobileView?'20vh':'20vh',overflowY:'auto',marginBottom:'2vh'}}>
                        {
                            Object.values(data).map((ob, key)=>(
                                <Grid item  key={key}>
                                    <Checkbox
                                        checked={checkBoxCategories[ob._id]}
                                        onChange={handleChangeCategories}
                                        name={ob._id}
                                        color="primary"
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
                                    return z.children.map((ob,key)=>(
                                        <Grid item key={key}>
                                            <Checkbox
                                                checked={checkBoxSubCategories[ob._id]}
                                                onChange={handleChangeSubCategories}
                                                name={ob._id}
                                                color="primary"
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
                        checked={selectedValue.name === 'ascending'}
                        onChange={handleChange}
                        value="ascending"
                        name="name"
                        color="primary"
                    />
                    <label>A-Z</label>

                    <Radio
                        checked={selectedValue.name === 'descending'}
                        onChange={handleChange}
                        value="descending"
                        name="name"
                        color="primary"
                    />
                    <label>Z-A</label>
                    <hr/>
                </Grid>

                <Grid item>
                    <p>Price</p>
                    
                    <Radio
                        checked={selectedValue.price === 'ascending'}
                        onChange={handleChange}
                        value="ascending"
                        name="price"
                        color="primary"
                    />
                    <label>Low to High</label>

                    <Radio
                        checked={selectedValue.price === 'descending'}
                        onChange={handleChange}
                        value="descending"
                        name="price"
                        color="primary"
                    />
                    <label>High to Low</label>
                </Grid>
            </Grid>   

        </Paper>
    );
}

export default Filter;