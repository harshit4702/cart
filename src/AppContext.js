import React, {createContext,useReducer} from "react";
import _ from 'lodash';

const AppContext = createContext({});

const initialState= {
    mobileView: false,
    products: null,
    cartValue: 0,
    cart:[],
}

const reducer= (state, action)=>{
    console.log(action.type);
    switch (action.type){
        case "setMobileView":
            return {...state, mobileView: action.payload};
        case "fetchProducts":
            return {...state, products: _.mapKeys(action.payload,'_id')};
        case "setCartValue":
            return {...state, cartValue: action.payload};
        case "fetchCartItems":
            return {...state, cart: _.mapKeys(action.payload,'_id')};
        case "fetchCartItem":
            return { ...state, cart: {[action.payload._id]: action.payload }};
        case "addCartItem":
            console.log("grk");
            return {...state, cart:{...state.cart,[action.payload._id]: action.payload }};
        case "editCartItem":
            return { ...state, cart: {...state.cart,[action.payload._id]: action.payload}};
        case "deleteCartItem":
            return {...state, cart: _.omit(state.cart, action.payload)};
        default:
            console.log("default");
            return {...state};
    }
}

const AppContextProvider= (props)=>{
    const appState= {...initialState};

    const [state,dispatch]= useReducer(reducer,appState);

    let value = {state,dispatch};

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export {AppContext, AppContextProvider};