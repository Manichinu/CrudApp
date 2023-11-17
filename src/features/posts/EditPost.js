import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, newPost, deletePost, updatePost, updatePosts, deletePosts } from "./postSlice";
import { useEffect, useState } from "react";
import { fetchUsers, selectUsers, userStatus } from "../users/userSlice";
import { useNavigate, useParams } from "react-router-dom";


const EditPost = () => {
    const user = useSelector(userStatus)
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const Navigate = useNavigate();
    const { editID } = useParams();
    const AllPost = useSelector(selectAllPosts)
    let editPost;
    editPost = AllPost.find((post) => post.id == editID)
    const [title, setTitle] = useState(editPost?.title);
    const [body, setBody] = useState(editPost?.body);
    const [userId, setUserId] = useState(editPost?.userId);

    let usersLists;
    useEffect(() => {
        if (user == "idle") {
            dispatch(fetchUsers())
        }
    }, [user, dispatch])

    if (user == "Succeeded") {
        usersLists = users.map((item) => {
            return (
                <option value={item.id}>{item.name}</option>
            )
        })

    }


    const canSave = Boolean(title) && Boolean(body) && Boolean(userId);

    const EditPost = () => {
        if (title && body) {
            try {
                dispatch(updatePosts({ title, body, userId, id: editPost.id, reactions: editPost.reactions }));
                setTitle('');
                setBody('');
                setUserId("")
                Navigate(`/post/${editID}`)
            } catch (err) {
                console.log(err)
            }

        }
    }
    const DeletePost = () => {
        dispatch(deletePosts({ id: Number(editID) }))
        Navigate('/')
    }
    return (
        <>

            <div className="shadow-sm p-3 mb-5 bg-white rounded form">
                <form>
                    <h4 style={{ textAlign: "center", color: "#79786f" }}>EDIT POST</h4>
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
                        <button disabled={!canSave} type="button" class="btn btn-sm" onClick={EditPost} style={{ background: "#79786f", color: "white" }}>UPDATE</button>
                        <button type="button" onClick={DeletePost} class="btn btn-danger btn-sm" style={{ color: "white", marginLeft: "10px" }}>Delete</button>

                    </div>
                </form>
            </div>

        </>
    )
}

export default EditPost;