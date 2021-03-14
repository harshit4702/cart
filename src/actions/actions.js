import axios from '../axios'

export const mobileView= (flag)=>{
    return {
        type: "setMobileView",
        payload:flag
    }
}

export const cartValue= (value)=>{
    return {
        type: "setCartValue",
        payload:value
    }
}

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