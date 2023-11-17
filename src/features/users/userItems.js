import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectAllPosts } from "../posts/postSlice";
import { selectedUser } from "./userSlice";
import { useEffect } from "react";
import { getPostsStatus } from "../posts/postSlice";



const UserItems = () => {
    const { userId } = useParams();
    const status = useSelector(getPostsStatus)
    let AllPosts, posts, Name, user;
    AllPosts = useSelector(selectAllPosts);
    posts = AllPosts.filter((post) => post.userId == userId)
    user = useSelector((state) => selectedUser(state, userId))
    Name = user[0].name
    const renderedPosts = posts.map((item) => {
        return (
            <li key={item.id}>
                <Link to={`/post/${item.id}`}>{item.title}</Link>
            </li>
        )
    })

    return (
        <>
            <h4 style={{ textAlign: "center", color: "#79786f", marginTop: "20px" }}>{Name}</h4>
            <div style={{ marginTop: "20px", marginLeft: "30%" }}>
                <ol>{renderedPosts}</ol>
            </div>
        </>
    )
}

export default UserItems;