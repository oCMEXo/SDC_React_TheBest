import {createSlice} from '@reduxjs/toolkit';

const initialState= {
    email: null,
    token: null,
    id: null,
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser(state, action){
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        removeUser(state){
            state.email = null;
            state.token = null;
            state.id = null;
        },
    }
})


export const {setUser, removeUser} = usersSlice.actions;
export default usersSlice.reducer;