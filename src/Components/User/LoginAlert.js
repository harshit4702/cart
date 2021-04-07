import React,{useState, useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button' ;
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import clsx from "clsx";
import {addCartItem, auth, fetchCartItem} from "../../actions/actions";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {AppContext} from '../../AppContext';
import axios from '../../axios';

const LoginAlert= (props)=>{

  const {state,dispatch}= useContext(AppContext);

  const [validation, setValidation]= useState(false);

  const [validationMessage, setValidationMessage]= useState("");

  const [showPassword, setShowPassword]= useState(false);

  const onSubmit= async(e)=>{
    e.preventDefault();
    console.log(values);

    try{
        const response= await axios.post('/user/login',{email:values.email,password:values.password});
        setValidation(false);
        setValidationMessage('');
        dispatch(await auth(response.data,true));
        props.closeAlert();
    }
    catch(err){
        setValidation(true);
        setValidationMessage("Email or Password doesn't match");
    }
}
  const [values, setValues] = useState({
    email:'',
    password: ''
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(true);
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
        <FormControl className={clsx(props.myClasses.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
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
        <Button type="submit" variant="contained" color="primary" >                
            Sign In
        </Button>
    </form>
  );
}

export default LoginAlert;