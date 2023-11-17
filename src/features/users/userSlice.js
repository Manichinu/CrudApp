import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// const initialState = [
//     { id: "1", name: "Max" },
//     { id: "2", name: "Alen" },
//     { id: "3", name: "George" }
// ]
const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const initialState = {
    users: [],
    status: "idle",
    error: null
}

export const fetchUsers = createAsyncThunk('posts.fetchUsers', async () => {
    const response = await axios.get(USERS_URL)
    return response.data
})

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = "Succeeded"
                state.users = action.payload

            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message;

            })
    }
})

export const selectUsers = (state) => state.users.users;
export const userStatus = (state) => state.users.status
export const selectedUser = (state, userID) =>
    state.users.users.filter((item) => item.id == userID)

export default userSlice.reducer;