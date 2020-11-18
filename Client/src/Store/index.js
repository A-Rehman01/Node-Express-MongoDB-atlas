import  {configureStore} from '@reduxjs/toolkit';
import PostSlice from  './Reducer/PostSlice'
import DeletePostSlice from './Reducer/DeletePostSlice'
import PatchPostSlice from './Reducer/PatchPostSlice'

export const Store = configureStore({
    reducer:{
        sendpost:PostSlice,
        deletepost:DeletePostSlice,
        updatepost:PatchPostSlice
    }
})