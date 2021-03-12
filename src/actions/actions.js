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