import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectAllPosts } from "./postSlice";
import Author from "./postUser";
import TimeCalculation from "./TimeAgo";
import Reactions from "./ReactionButtons";


const SinglePostPage = () => {
    const { postID } = useParams();
    const post = useSelector(selectAllPosts);
    let selectedPost;
    selectedPost = post.find((post) => post.id == postID)
    console.log(selectedPost)

    return (
        <div className="col-6 col-md-4 shadow p-3 mb-5 bg-white rounded post_div" style={{ margin: "auto", marginTop: "40px" }}>
            <div key={selectedPost.id}>
                {/* <p>{selectedPost.id}</p> */}
                <h4>{selectedPost.title}</h4>
                <p>{selectedPost.body.substring(0, 40)}</p>
                <Link to={`/post/edit/${selectedPost.id}`} style={{color:"white"}}>Edit Post</Link>
                <div>by <Author userid={selectedPost.userId} />&nbsp;
                    <TimeCalculation time={selectedPost.date} /> </div>
                <div><Reactions post={selectedPost} /></div>
            </div>
        </div>
    )
}


export default SinglePostPage;