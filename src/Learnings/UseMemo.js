import React, { useMemo, useState } from 'react';


function Memo() {
    const [arr, setArr] = useState([1, 2, 3, 4, 5]);
    const [num, setNum] = useState(0);
    function FindMax() {
        console.log("change max")
        return Math.max(...arr)
    }
    const MaxValue = useMemo(() => FindMax(), [arr]);
    return (
        <>
            <p>{num}</p>
            <button onClick={() => setNum(num + 1)}>Add Count</button>
            <p>{MaxValue}</p>
        </>
    )
}

export default Memo;