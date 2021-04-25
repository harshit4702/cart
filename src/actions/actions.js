import axios from '../axios'
import { categoriesData } from '../helpers/categoriesData';
import {productData} from '../helpers/productData';


export const mobileView= (flag)=>{
    return {
        type: "setMobileView",
        payload:flag
    }
}

export const auth = (user,flag)=>{
    console.log(user);
    return {
        type: "isAuth",
        payload: {
            user,
            flag,
        }
    }
};

export const cartValue= (value)=>{
    return {
        type: "setCartValue",
        payload:value
    }
}

export const setFilter= (data)=>{
    return {
        type: "setFilter",
        payload:data
    }
}

export const fetchCategories = ()=> {
    const response= categoriesData();
    return {
        type: "fetchCategories", 
        payload: response
    };
};

export const fetchingCategories = async()=> {
    const response= await axios.get('/category');
    return {
        type: "fetchingCategories", 
        payload: response.data
    };
};

export const fetchProducts = async()=> {
    const response= await axios.get(`/product`);
    return {
        type: "fetchProducts", 
        payload: response.data
    };
};

export const fetchUsers = async()=> {
    const response= await axios.get('/user');
    return {
        type: "fetchUsers", 
        payload: response.data
    };
};

export const filteredCategories = (data)=> {
    console.log(data);
    return {
        type: "fetchFilteredCategories", 
        payload: data
    };
};
export const filteredSubCategories = (data)=> {
    console.log(data);
    return {
        type: "fetchFilteredSubCategories", 
        payload: data
    };
};

export const filteredCategoryPresent = (flag)=> {
    return {
        type: "isFilteredCategoryPresent", 
        payload: flag
    };
};

export const fetchCartItems = async () => {
    const response = await axios.get('/cart');
    return {
        type: 'fetchCartItems', 
        payload: response.data
    }
};

export const fetchCartItem = async (id) => {
    const response = await axios.get(`/cart/${id}`);
    console.log( Object.values(response.data));
    return { 
        type: 'fetchCartItem', 
        payload: response.data
    }
};

export const addCartItem= async(cartId,formValues)=>{
    const response= await axios.post(`/cart/${cartId}`, formValues);

    console.log(response.data);
    return {
        type: 'addCartItem',
        payload: response.data
    }
};

export const editCartItem = async(id,quantity,user, formValues) =>{
    const response=  await axios.patch(`/cart/${user.cart}/${id}/${quantity}`, formValues);

    return { 
        type: 'editCartItem', 
        payload: response.data
    }
};

export const deleteCartItem = async (cartId,productId)=> {
    await axios.delete(`/cart/${cartId}/${productId}`);
    return {
        type: 'deleteCartItem',
        payload: productId
    }
}