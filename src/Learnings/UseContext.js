import React, { useContext } from "react";
import { AppContext } from "../App";


function Context() {
    const { name, setName } = useContext(AppContext)
    return (
        <>
            <h1>{name}</h1></>
    )
}

export default Context;