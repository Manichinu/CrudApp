import { useSelector } from "react-redux";
import { selectUsers } from "../users/userSlice";


const Author = ({ userid }) => {
    const user = useSelector(selectUsers);
    const FindUser = user.find((item) => item.id == userid)
    return (
        <span>{FindUser ? FindUser.name : "unknown author"}</span>
    )
}

export default Author;