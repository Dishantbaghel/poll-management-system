import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchedAllPolls } from "../redux/reducers/AdminSlice";
import { dispatch } from "../redux/Store";
import { AddPoll } from "../redux/reducers/AddPollSlice";
import "./admin.css";

const Admin = () => {
  const listItems = useSelector((state) => state.AdminSlice.data);
  const [error, setError] = useState(false);
  const [addPoll, setAddPoll] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newOptions, setNewOptions] = useState([{ option: "" }]);
  const [newOptionsList, setNewOptionsList] = useState([]);

  useEffect(() => {
    dispatch(fetchedAllPolls());
  }, [dispatch]);

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
    if (newTitle !== "" && condition) {
      newOptions.map((each) =>
        setNewOptionsList(newOptionsList.push(each.option))
      );
      dispatch(AddPoll(newTitle, newOptionsList));
    }
    setAddPoll(false)
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const onChangeValue = [...newOptions];
    onChangeValue[index][name] = value;
    setNewOptions(onChangeValue);
  };

  const updatedInput = (event) => {
    if (event.target.value !== " ") {
      setNewTitle(event.target.value);
    }
  };

  return (
    <div className="admin-parent">
      <div className="admin-page-container">
        <h1>welcome to Admin page</h1>
        <button onClick={() => setAddPoll(!addPoll)}>Add Poll</button>

        {addPoll ? (
          <div className="add-poll">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <label htmlFor="">Title:</label>
              <input type="text" className="add-poll-input" name="newTitle"
              id="newTitle"
              value={newTitle}
              onChange={updatedInput} />

              {newOptions.map((each, index) => (
                <div key={index} className="optionsContainer">
                  <p className="addText">option {index + 1}:</p>
                  <input
                    className="add-poll-input"
                    name="option"
                    type="text"
                    value={each.option}
                    onChange={(event) => handleChange(event, index)}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Add Option</button>
              <button type="submit">Submit</button>
              <button onClick={() => setAddPoll(false)}>Cancel</button>
            </form>
          </div>
        ) : (
          <div className="container mt-2" style={{ wordWrap: "break-word" }}>
            <div className="row">
              <div className="col">
                {listItems.map((dataList) => (
                  <div className="card mt-3" key={dataList._id}>
                    <div className="card-header ">
                      <h5
                        className="card-title"
                        style={{ wordWrap: "break-word" }}
                      >
                        {dataList.title}
                      </h5>
                      <div>
                        <button>Edit</button>
                        <button>Delete</button>
                      </div>
                    </div>
                    <div className="card-body">
                      {dataList.options.map((option) => (
                        <div className="form-check" key={option.option}>
                          <div className="d-flex justify-content-between">
                            <div
                              className="poll-options"
                              style={{ wordWrap: "break-word" }}
                            >
                              <div>
                                <input type="radio" name={dataList._id} />
                                {option.option}
                              </div>
                              <button>Delete</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
