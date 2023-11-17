import { combineReducers } from "@reduxjs/toolkit";
import SignUpSlice from "./SignUpSlice";
import loginSlice from './LoginSlice'

const rootReducer = combineReducers({
    SignUpSlice : SignUpSlice,
    loginSlice : loginSlice,
})

export default rootReducer