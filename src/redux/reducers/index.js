import { combineReducers } from "@reduxjs/toolkit";
import SignUpSlice from "./SignUpSlice";
import loginSlice from './LoginSlice'
import HomeSlice from "./HomeSlice";
import AdminSlice from "./AdminSlice";
import AddPollSlice from "./AddPollSlice";

const rootReducer = combineReducers({
    SignUpSlice : SignUpSlice,
    loginSlice : loginSlice,
    HomeSlice : HomeSlice,
    AdminSlice : AdminSlice,
    AddPollSlice : AddPollSlice,
})

export default rootReducer