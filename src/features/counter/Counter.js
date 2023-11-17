import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementAmount } from "./counterSlice";
import { getCounters } from "./counterSlice";

const Counter = () => {
    const count = useSelector(getCounters);
    const dispatch = useDispatch();
    const [increments, setIncrements] = useState(0);
    const addValue = Number(increments)
    return (
        <div>
            <p>{count}</p>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <input type="number" value={increments} onChange={(e) => setIncrements(e.target.value)} />
            <button onClick={() => dispatch(incrementAmount(addValue))}>Add</button>

        </div>
    )
}

export default Counter;