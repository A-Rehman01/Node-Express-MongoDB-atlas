import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const UpdatePost = createAsyncThunk(
    'updatepostfromapi',
    async (data, thunkapi) => {
        console.log('Update',data)
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data.post),
        }
        const response = await fetch(`https://thawing-meadow-26600.herokuapp.com/posts/${data.id}`, requestOptions)
        console.log(response)
        return await data;
    }
)

export const PatchPostSlice = createSlice({
    name: 'updatepost',
    initialState: {
        update: [],
        isloading: false,
    },

    reducers: {

    },
    extraReducers: {
        [UpdatePost.fulfilled]: (state, action) => {
            console.log('fullfild')
            console.log(action.payload)
            state.update = action.payload
            state.isloading = false
        },
        [UpdatePost.reject]: (state, action) => {
            console.log('API Rejected');
        },
        [UpdatePost.pending]: (state, action) => {
            console.log('pending')
            state.isloading = true
        },
    }
})

// export const { } = PatchPostSlice.actions;

export const updatePost = (state) => {
    return ({
        updatePost: state.updatepost.update,
        loading: state.updatepost.isloading
    })
}

export default PatchPostSlice.reducer;