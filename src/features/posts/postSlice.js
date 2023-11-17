import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

// const initialStates = [
//     {
//         id: 1,
//         title: "Redux",
//         content: "learn",
//         date: sub(new Date(), { minutes: 10 }).toISOString(),
//         reactions: {
//             like: 0,
//             smile: 0,
//             heart: 0
//         }
//     },
//     {
//         id: 2,
//         title: "React Redux",
//         content: "learn in Tamil",
//         date: sub(new Date(), { minutes: 5 }).toISOString(),
//         reactions: {
//             like: 0,
//             smile: 0,
//             heart: 0
//         }

//     },
//     {
//         id: 3,
//         title: "Redux Toolkit",
//         content: "High Demand Skills",
//         date: sub(new Date(), { minutes: 2 }).toISOString(),
//         reactions: {
//             like: 0,
//             smile: 0,
//             heart: 0
//         }

//     }
// ]

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POST_URL)
    return response.data
})

export const newPost = createAsyncThunk("posts/newPost", async (initialPost) => {
    const response = await axios.post(POST_URL, initialPost);
    return response.data;
})

export const updatePost = createAsyncThunk("posts/updatePost", async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.put(`${POST_URL}/${id}`, initialPost)
        return response.data
    } catch (err) {
        return initialPost
    }

})

export const deletePost = createAsyncThunk("posts/deletePost", async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${POST_URL}/${id}`, initialPost)
        if (response?.ststus == 200) {
            return initialPost
        } else {
            return `${response.status}:${response.statusText}`;
        }
    } catch (err) {
        return err.message
    }

})

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, body, userId) {
                return {
                    payload: {
                        userId,
                        id: nanoid(),
                        title,
                        body,
                        date: new Date().toISOString(),
                        reactions: {
                            like: 0,
                            smile: 0,
                            heart: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const findPost = state.posts.find((item) => item.id == postId)
            if (findPost) {
                findPost.reactions[reaction]++
            }
        },
        deletePosts(state, action) {
            const { id } = action.payload
            const findPost = state.posts.filter((item) => item.id != id)
            state.posts = []
            state.posts = state.posts.concat(findPost)
        },
        updatePosts(state, action) {
            console.log(action.payload)
            const { id } = action.payload;
            action.payload.date = new Date().toISOString();
            const posts = state.posts.filter((post) => post.id != id)
            state.posts = []
            state.posts = [...posts, action.payload]
        }

    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "Succeeded"
                // Adding date and reaction
                let min = 1;
                let loadPosts = action.payload.map((item) => {
                    item.date = sub(new Date(), { minutes: min++ }).toISOString();
                    item.reactions = {
                        like: 0,
                        smile: 0,
                        heart: 0
                    }
                    return item;

                })
                // Add fetched post to the array
                state.posts = [];
                state.posts = state.posts.concat(loadPosts);

            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message
            })
            .addCase(newPost.fulfilled, (state, action) => {
                var NewID = 0;
                var AllValues = state.posts.map((item) => {
                    NewID = item.id;
                })
                NewID += 1;
                action.payload.id = NewID
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    like: 0,
                    smile: 0,
                    heart: 0
                }
                state.posts = state.posts.concat(action.payload)
                console.log(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log("couldn't update")
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                action.payload.date = new Date().toISOString();
                const posts = state.posts.filter((post) => post.id != id)
                state.posts = [...posts, action.payload]
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                console.log(action.payload)
                const { id } = action.payload
                const findPost = state.posts.filter((item) => item.id != id)
                state.posts = []
                state.posts = findPost
            })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;


export const { addPost, reactionAdded, deletePosts, updatePosts } = postSlice.actions;
export default postSlice.reducer;