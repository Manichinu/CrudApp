import React, { useRef, useState } from "react";


function Norerender() {
    const [counter, setCounter] = useState(0);
    const counterRef = useRef(0);
    const handleClick = () => {
        setCounter(counter + 1);
    }
    const handleRef = () => {
        counterRef.current++;
    }
    console.log("rerendering")
    return (
        <>
            <p>Counter is {counter}</p>
            <button onClick={handleClick}>Add Count</button>
            <p>Ref is {counterRef.current}</p>
            <button onClick={handleRef}>Add Ref</button>
        </>
    )
}

export default Norerender;