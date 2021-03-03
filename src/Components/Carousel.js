import React,{useContext} from 'react';

import {AppContext} from "../AppContext";


const Carousel= ()=> {

    const {state}=  useContext(AppContext);
    console.log(state);

    return (
        <div>
             Carousel
        </div>
    );
}

export default Carousel;