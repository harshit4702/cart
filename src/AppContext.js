import React, {createContext,useReducer} from "react";

const AppContext= createContext({});

const initialState= {}

const reducer= (state, action)=>{
    switch (action.type){
        default:
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