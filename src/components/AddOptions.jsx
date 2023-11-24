import { TextField } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { dispatch } from '../redux/Store';
import { optionsAdd } from '../redux/reducers/AddOptionSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddOptions = () => {
    const [inputOption,setInputOption] = useState('');
    const { optionId } = useParams();
    console.log(optionId);
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault(); 
        if(inputOption.trim() !==''){
        dispatch(optionsAdd(inputOption,optionId));
        navigate('/Admin')
      }else{
        toast.error('🦄 InputField cannot be empty!', {
          position: "top-center",
          autoClose: 5000,
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
        setInputOption(location.state);
        setInputOption(e.target.value);
      };

    const handleHome = () => {
        navigate('/Admin')
      };
    
      return (
        <div className="editPoll-container">
          <div className="editPoll-box1">
          <h1>ADD OPTION</h1>
            <form onSubmit={handleFormSubmit} >
              <label>Option: </label><br />
              <TextField 
                className="editPoll-input"
                type="text"
                // value={inputOption}
                variant="outlined"
                onChange={handleTitle}
              />
              <br/><br/>
              <button type='submit' className='btn'>Save</button>
              <button className='btn' onClick={handleHome}>Back</button>
            </form>
            <ToastContainer
position="top-center"
autoClose={5000}
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
    

export default AddOptions