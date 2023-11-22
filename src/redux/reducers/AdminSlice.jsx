import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/axios';

export const fetchedAllPolls = createAsyncThunk('admin/fetchedAllPolls', async () => {
  try {
    const response = await axiosInstance.get('list_polls');
    return response.data;
  } catch (error) {
    throw error;
  }
});

const AdminSlice = createSlice({
  name: 'admin',
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchedAllPolls.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchedAllPolls.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data.reverse();
      })
      .addCase(fetchedAllPolls.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default AdminSlice.reducer;