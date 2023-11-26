import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsError, getPostsStatus } from "./postSlice";
// import { selectUsers } from "../users/userSlice";
import Author from "./postUser";
import TimeCalculation from "./TimeAgo";
import Reactions from "./ReactionButtons";
import { Link } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';


const PostList = () => {
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const postsError = useSelector(getPostsError);
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     if (postsStatus == 'idle') {
    //         dispatch(fetchPosts())
    //     }

    // }, [postsStatus, dispatch])

    let postItems;
    if (postsStatus == "Succeeded") {
        const sortedItems = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        postItems = sortedItems.map((item) => {
            return (
                <div className="col-6 col-md-4 shadow p-3 mb-5 bg-white rounded post_div">
                    <div key={item.id}>
                        {/* <p>{item.id}</p> */}
                        <h4>{item.title}</h4>
                        <p>{item.body.substring(0, 40)}</p>
                        <Link to={`/post/${item.id}`} style={{ color: "white" }}>View Post</Link>
                        <div>by <Author userid={item.userId} />&nbsp;
                            <TimeCalculation time={item.date} /> </div>
                        <div><Reactions post={item} /></div>
                    </div>
                </div>
            )
        })
    }
    else if (postsStatus == "loading") {
        // postItems = <p style={{ textAlign: "center" }}>Loading...</p>
        postItems = Array.from({ length: 100 }, (_, index) => (
            <div className="col-6 col-md-4 shadow p-3 mb-5 bg-white rounded" key={`loading-${index}`}>
                <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
                <div key={`loading-${index}`}>
                    <Skeleton variant="text" width="60%" height={24} animation="wave" />
                    <Skeleton variant="text" width="80%" height={16} animation="wave" />
                    <Skeleton variant="text" width="40%" height={16} animation="wave" />
                    <Skeleton variant="text" width="20%" height={16} animation="wave" />
                </div>
            </div>
        ));


    }
    else if (postsStatus == "failed") {
        postItems = <p>{postsError}</p>

    }

    return (
        <>
            <h4 id="post_title">POST LISTS</h4>
            <div className="row post_list">
                {postItems}
            </div>
        </>
    )
}

export default PostList;