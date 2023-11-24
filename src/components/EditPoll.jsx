import {  useLocation, useNavigate, useParams } from 'react-router-dom';
import './editPoll.css'
import { TextField } from '@mui/material'
import { dispatch } from '../redux/Store';
import { updateTitle } from '../redux/reducers/EditPollSlice';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPoll = () => {
  const [inputTitle,setInputTitle] = useState('');
  const { edittitleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setInputTitle(location.state);
  }, [location.state]);

  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    if(inputTitle.trim() !==''){
      dispatch(updateTitle(inputTitle, edittitleId));
      navigate('/Admin')
    }else{
      toast.error('🦄 InputField cannot be empty!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    
  };

  const handleTitle = (e) => {
    setInputTitle(location.state);
    setInputTitle(e.target.value);
  };

  const handleHome = () => {
    navigate('/Admin')
  };

  return (
    <div className="editPoll-container">
      <div className="editPoll-box1">
      <h1>EDIT POLL</h1>
        <form onSubmit={handleFormSubmit} >
          <label>Update Title: </label><br />
          <TextField 
            className="editPoll-input"
            type="text"
            value={inputTitle}
            variant="outlined"
            onChange={handleTitle}
          />
          <br/><br/>
          <button type='submit' className='btn'>Save</button>
          <button className='btn' onClick={handleHome}>Back</button>
        </form>
        <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
      </div>
    </div>
  )
}

export default EditPoll