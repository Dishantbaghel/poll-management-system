import React, { useEffect, useState } from 'react'
import { AddPoll } from '../redux/reducers/AddPollSlice';
import { useNavigate } from 'react-router-dom';
import { dispatch } from '../redux/Store';
import './addPolls.css'
import { TextField } from '@mui/material';

const AddPolls = () => {
  const [title, setTitle] = useState("");
  const [newOptions, setNewOptions] = useState([{ option: "" }]);
  const [newOptionsList, setNewOptionsList] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    if (newOptions.length > 3) {
      setError(true);
    } else {
      setNewOptions([...newOptions, { option: "" }]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const condition = newOptions.every((each) => each.option !== "");
    if (title !== "" && condition) {
      newOptions.map((each) =>
        setNewOptionsList(newOptionsList.push(each.option))
      );
      dispatch(AddPoll(title, newOptionsList));
      navigate('/Admin')
    }
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const onChangeValue = [...newOptions];
    onChangeValue[index][name] = value;
    setNewOptions(onChangeValue);
  };

  const updatedInput = (event) => {
    if (event.target.value !== " ") {
      setTitle(event.target.value);
    }
  };

  const handleCancel=()=>{
    navigate('/Admin')
  }

  return (
    <div className='addPolls-container'>
        <div className="addPolls-box1">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <label>Title:</label>
                <TextField
                  type="text"
                  className="addPolls-input"
                  value={title}
                  onChange={updatedInput}
                />

                {newOptions.map((each, index) => (
                  <div key={index} className="optionsContainer">
                    <p className="addText">option {index + 1}:</p>
                    <TextField
                      className="addPolls-input"
                      name="option"
                      type="text"
                      value={each.option}
                      onChange={(event) => handleChange(event, index)}
                    />
                  </div>
                ))}
                <button className='btn' onClick={handleClick}>Add Option</button>
                <br />
                <button className='btn' type="submit">Submit</button>
                <button className='btn' onClick={handleCancel}>Cancel</button>
              </form>
            </div>
            </div>
  )
}

export default AddPolls