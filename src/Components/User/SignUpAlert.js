import React,{useState, useContext} from 'react';
import {useHistory,Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button' ;
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import clsx from "clsx";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from '../../axios';

import {AppContext} from "../../AppContext";

const SignUpAlert= (props)=> {

    const {state,dispatch}= useContext(AppContext);

    const [validation, setValidation]= useState(false);

    const [validationMessage, setValidationMessage]= useState("");

    const [showPassword, setShowPassword]= useState(false);

    const onSubmit= async(e)=>{
        e.preventDefault();
        console.log(values);

        if(values.confirmPassword!==values.password){
            setValidation(true);
            setValidationMessage("Both Password doesn't match");
            return;
        }

        try{
            const response= await axios.post('/user/signUp',{email:values.email,password:values.password});
            setValidation(false);
            setValidationMessage('');
            alert('Congratulation... You have Registered to Shopping App');
            props.closeAlert();
        }
        catch(err){
            setValidation(true);
            setValidationMessage("User already Registered");
        }
    }

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword:''
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickHandlePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    
    return (
        <form onSubmit={onSubmit}>         
            {
                validation && (
                    <h6 style={{color:'red'}}>{validationMessage}</h6>
                )
            } 
            <TextField id="standard-secondary" label="Enter Email" value={values.email} style={{width: '226px'}} onChange={handleChange('email')} name="email" type="email" color="primary"> </TextField><br></br>
            <br/>
            <TextField id="standard-secondary" label="Enter Password" value={values.password} style={{width: '226px'}} onChange={handleChange('password')} name="password" type="password"  color="primary"> </TextField><br></br>
            <br/>
            <FormControl className={clsx(props.myClasses.textField)}>
                <InputLabel htmlFor="standard-adornment-password">Re-Enter Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickHandlePassword}
                                onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
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
        </form>
    );
}

export default SignUpAlert;