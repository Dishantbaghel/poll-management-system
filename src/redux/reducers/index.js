import { combineReducers } from "@reduxjs/toolkit";
import SignUpSlice from "./SignUpSlice";
import loginSlice from './LoginSlice'
import HomeSlice from "./HomeSlice";

const rootReducer = combineReducers({
    SignUpSlice : SignUpSlice,
    loginSlice : loginSlice,
    HomeSlice : HomeSlice,
})

export default rootReducer