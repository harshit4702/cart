import React,{useContext} from 'react';

import {AppContext} from "../AppContext";


const Navbar= ()=> {

    const {state}=  useContext(AppContext);
    console.log(state);

    return (
        <div>
            Navbar
        </div>
    );
}

export default Navbar;