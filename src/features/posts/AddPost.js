import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, newPost } from "./postSlice";
import { useEffect, useState } from "react";
import { fetchUsers, selectUsers, userStatus } from "../users/userSlice";
import { useNavigate } from "react-router-dom";


const AddNewPost = () => {
    const user = useSelector(userStatus)
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState('');
    const users = useSelector(selectUsers);
    const Navigate = useNavigate();

    let usersLists;
    // useEffect(() => {
    //     if (user == "idle") {
    //         dispatch(fetchUsers())
    //     }
    // }, [user, dispatch])

    if (user == "Succeeded") {
        usersLists = users.map((item) => {
            return (
                <option value={item.id}>{item.name}</option>
            )
        })
    }
    const canSave = Boolean(title) && Boolean(body) && Boolean(userId);

    const AddPost = () => {
        if (title && body) {
            // dispatch(
            //     addPost(title, body, userId)
            // )
            dispatch(newPost({ title, body, userId }));
            setTitle('');
            setBody('');
            setUserId("")
            Navigate('/')
        }
    }

    return (
        <>
            {/* <div className="row form"> */}
            {/* <div className="col-6 col-md-4 shadow-sm p-3 mb-5 bg-white rounded"> */}
            <div className="shadow-sm p-3 mb-5 bg-white rounded form">
                <form>
                    <h4 style={{ textAlign: "center", color: "#79786f" }}>ADD NEW POST</h4>
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" class="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div class="form-group">
                        <label for="content">Content</label>
                        <input type="text" class="form-control" id="content" value={body} onChange={(e) => setBody(e.target.value)} />
                    </div>
                    <div class="form-group">
                        <label for="users">Author</label>
                        <select class="form-control" id="users" value={userId} onChange={(e) => setUserId(e.target.value)}>
                            <option value="">--Select--</option>
                            {usersLists}
                        </select>
                    </div>
                    <div className="text-center">
                        <button disabled={!canSave} type="button" class="btn btn-sm" onClick={AddPost} style={{ background: "#79786f", color: "white" }}>ADD</button>
                    </div>
                </form>
            </div>
            {/* </div> */}
            {/* </div> */}
        </>
    )
}

export default AddNewPost;