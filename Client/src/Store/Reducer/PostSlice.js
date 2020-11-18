import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const createPost = createAsyncThunk(
    'sendpostfromapi',
    async (data, thunkapi) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }
        const response = await fetch('https://thawing-meadow-26600.herokuapp.com/posts', requestOptions)
        console.log(response)
        return await data;
    }
)

export const PostSlice = createSlice({
    name: 'sendpost',
    initialState: {
        post: [],
        isloading: false,
    },

    reducers: {

    },
    extraReducers: {
        [createPost.fulfilled]: (state, action) => {
            console.log('fullfild')
            state.post = action.payload
            state.isloading = false
        },
        [createPost.reject]: (state, action) => {
            console.log('API Rejected');
        },
        [createPost.pending]: (state, action) => {
            console.log('pending')
            state.isloading = true
        },
    }
})

// export const { } = PostSlice.actions;

export const sendPost = (state) => {
    return ({
        sendPost: state.sendpost.post,
        loading: state.sendpost.isloading
    })
}

export default PostSlice.reducer;