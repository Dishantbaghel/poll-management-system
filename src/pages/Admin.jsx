import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchedAllPolls } from "../redux/reducers/AdminSlice";
import { dispatch } from "../redux/Store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./admin.css";
import { deletePoll } from "../redux/reducers/DeletePollSlice";
import { deleteOption } from "../redux/reducers/DeleteOptionSlice";
import { NavLink } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";

const Admin = () => {
  const listItems = useSelector((state) => state.AdminSlice.data);
  const deleteSingleOption = useSelector((state) => state.DeleteOptionSlice.isLoading);
  const deleteSinglePoll = useSelector((state) => state.DeletePollSlice.isLoading);
  const add = useSelector((state) => state.AddPollSlice.isLoading);
  const deleteOpt = useSelector((state) => state.AddOptionSlice.isLoading);
  const editTitle = useSelector((state) => state.OptionsSlice.isLoading);


  const isLoading = deleteSingleOption || deleteSinglePoll || add || deleteOpt || editTitle;

  const [open, setOpen] = React.useState(isLoading);

  useEffect(() => {
    setOpen(isLoading);
  }, [isLoading]);

  useEffect(() => {
    dispatch(fetchedAllPolls());
  }, [deleteSingleOption, deleteSinglePoll, add, deleteOpt, editTitle]);

  const handleDelete = (id) => {
    dispatch(deletePoll(id));
  };

  const handleDeleteOption = (id, opt, i) => {
    if (listItems) {
      dispatch(deleteOption(id, opt));
    }
  };

  return (
    <div className="admin-parent">
      <div className="admin-page-container">
        <div className="header">
          <h1 style={{ color: "white" }}>welcome to Admin page</h1>
          <NavLink to={"/AddPolls"}>
            <button className="btn">Add Poll</button>
          </NavLink>
          <NavLink to={"/signIn"}>
            <button className="btn">Log Out</button>
          </NavLink>
        </div>
        {open && (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}

        <div className="container mt-4" style={{ wordBreak: "break-word" }}>
          <div className="row">
            <div className="col">
              {listItems.map((dataList) => (
                <div className="card mt-3" key={dataList._id}>
                  <div
                    className="card-header "
                    style={{ backgroundColor: "lightgray" }}
                  >
                    <h5
                      className="card-title"
                      style={{ wordWrap: "break-word" }}
                    >
                      {dataList.title}
                    </h5>
                    <div className="admin-btns">
                      {dataList.options.length < 4 && (
                        <NavLink
                          className={"icon-btns"}
                          to={`/AddOptions/${dataList._id}`}
                        >
                          <AddIcon />
                        </NavLink>
                      )}
                      <NavLink
                        className={"icon-btns"}
                        to={`/editPoll/${dataList._id}`}
                        state={dataList.title}
                      >
                        <EditIcon />
                      </NavLink>
                      <DeleteIcon
                        className={"icon-btns"}
                        onClick={() => handleDelete(dataList._id)}
                      />
                      {/* <CircularProgress/> */}
                    </div>
                  </div>
                  <div className="card-body">
                    {dataList.options.map((option, i) => (
                      <div className="form-check" key={option.option}>
                        <div className="d-flex justify-content-between">
                          <div
                            className="poll-options"
                            style={{ wordWrap: "break-word" }}
                          >
                            <div className="single-option">
                              <input type="radio" name={dataList._id} />
                              {option.option}
                            </div>
                            <DeleteIcon
                              className={"icon-btns"}
                              onClick={() =>
                                handleDeleteOption(
                                  dataList._id,
                                  option.option,
                                  i
                                )
                              }
                            />
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
      </div>
    </div>
  );
};

export default Admin;
