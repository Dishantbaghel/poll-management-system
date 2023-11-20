import {createSlice} from '@reduxjs/toolkit'
import { dispatch } from '../Store';
import axiosInstance from '../../utilities/axios';

const homeSlice = createSlice({
    name: 'pollList',
    initialState :{
        isLoading : false,
        isSuccess : false,
        isError : false,
        data : [],
    },
    reducers:{
        startLoading(state){
            state.isLoading = true;
            state.isError = false;
        },
        loginSucess(state, action){
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = action.payload.data.reverse();
        },
        hasError(state,action){
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.data = action.payload;
        },
        resetReducer(state) {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.data = {};
          },
    },
});

export function fetchedAllPolls(){
    return async () =>{
        dispatch(homeSlice.actions.startLoading());
        try{
            const response = await axiosInstance.get('list_polls');
            // console.log(response.data);
            dispatch(homeSlice.actions.loginSucess(response.data));
        }catch(e){
            dispatch(homeSlice.actions.hasError(e));
        }
    }
}


export const { startLoading, hasError, loginSuccess } = homeSlice.actions;

export default homeSlice.reducer;