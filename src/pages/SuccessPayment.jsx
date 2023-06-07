import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const SuccessPayment = ()=>{
    const {setCart} = useContext(AuthContext);
    setCart("")
    return <h1>Success Payment!</h1>
}

export default SuccessPayment