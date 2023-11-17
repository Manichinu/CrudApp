import { useSelector, useDispatch } from "react-redux";
import { selectUsers } from "./userSlice";
import { Link } from "react-router-dom";



const UserList = () => {
    const users = useSelector(selectUsers)
    const renderedUsers = users.map((item) => {
        return (
            <li key={item.id}>
                <Link to={`/users/${item.id}`}>{item.name}</Link>
            </li>
        )
    })
    return (
        <div>
            <h4 style={{ textAlign: "center", color: "#79786f", marginTop: "20px" }}>Users</h4>
            <div style={{ marginLeft: "44%" }}><ol style={{}}>{renderedUsers}</ol></div>
        </div>
    )
}

export default UserList;