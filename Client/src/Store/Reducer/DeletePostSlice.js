import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const DeletePost = createAsyncThunk(
    'deletepostfromapi',
    async (data, thunkapi) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }
        const response = await fetch(`https://thawing-meadow-26600.herokuapp.com/posts/${data}`, requestOptions)
        console.log(response)
        return await data;
    }
)

export const DeletePostSlice = createSlice({
    name: 'deletepost',
    initialState: {
        delete: [],
        isloading: false,
    },

    reducers: {

    },
    extraReducers: {
        [DeletePost.fulfilled]: (state, action) => {
            console.log('fullfild')
            state.delete = action.payload
            state.isloading = false
        },
        [DeletePost.reject]: (state, action) => {
            console.log('API Rejected');
        },
        [DeletePost.pending]: (state, action) => {
            console.log('pending')
            state.isloading = true
        },
    }
})

// export const { } = PostSlice.actions;

export const deletePost = (state) => {
    return ({
        deletePost: state.deletepost.delete,
        loading: state.deletepost.isloading
    })
}

export default DeletePostSlice.reducer;