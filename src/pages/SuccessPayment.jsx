import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const SuccessPayment = ()=>{
    const {setCart, setProductQ, setCartItems} = useContext(AuthContext);
    setCart("");
    setProductQ(0);
    setCartItems(0)

    return (
        <article style={{width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <h1>Success Payment!</h1>
        </article>
    )
}

export default SuccessPayment