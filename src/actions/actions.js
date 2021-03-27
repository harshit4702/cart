import axios from '../axios'
import {productData} from '../helpers/productData';
import {userData} from '../helpers/userData';

export const mobileView= (flag)=>{
    return {
        type: "setMobileView",
        payload:flag
    }
}
export const auth = (user,flag)=>{
    return {
        type: "isAuth",
        payload: {
            user,
            flag
        }
    }
};

export const cartValue= (value)=>{
    return {
        type: "setCartValue",
        payload:value
    }
}

export const fetchProducts = async()=> {
    const response= await productData();
    return {
        type: "fetchProducts", 
        payload: response
    };
};

export const fetchUsers = async()=> {
    const response= await userData();
    return {
        type: "fetchUsers", 
        payload: response
    };
};

export const fetchCartItems = async () => {
    const response = await axios.get('/cartItems');
    return {
        type: 'fetchCartItems', 
        payload: response.data
    }
};

export const fetchCartItem = async (id) => {
    const response = await axios.get(`/cartItems/${id}`);
    return { 
        type: 'fetchCartItem', 
        payload:response.data
    }
};

export const addCartItem= async(formValues)=>{
    const response= await axios.post('/cartItems', formValues);
    console.log(response.data);
    return {
        type: 'addCartItem',
        payload: response.data
    }
};

export const editCartItem = async(id, formValues) =>{
    const response=  await axios.patch(`/cartItems/${id}`, formValues);
    console.log(response.data);
    return { 
        type: 'editCartItem', 
        payload: response.data
    }
};

export const deleteCartItem = async (id)=> {
    await axios.delete(`/cartItems/${id}`);
    return {
        type: 'deleteCartItem',
        payload: id
    }
}