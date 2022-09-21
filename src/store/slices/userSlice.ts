import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface User {
    email: null | string,
    id: null | string,
    token: null | string,
}

const initialState: User = {
    email: null,
    id: null,
    token: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
        }
    }
})

export const {setUser, removeUser} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;