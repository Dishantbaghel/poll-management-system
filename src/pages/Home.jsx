import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchedAllPolls } from "../redux/reducers/HomeSlice";
import { dispatch } from "../redux/Store";
import { useNavigate } from "react-router-dom";
import { vote } from "../redux/reducers/VoteSlice";
import { Pagination } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const listItems = useSelector((state) => state.HomeSlice.data);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [disabledOptions, setDisabledOptions] = useState({});

  useEffect(() => {
    dispatch(fetchedAllPolls());
  }, [listItems.isSuccess]);

  const handleLogOut = () => navigate("/");

  const handleVote = (id, opt) => {
    const token = localStorage.getItem("token");
    const header = {
      headers: {
        access_token: token,
      },
    };
    dispatch(vote(id, opt, header));
    setDisabledOptions({ ...disabledOptions, [id]: true });
    toast.success("🦄 Thanks for voting!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handlePage = (selectedPage) => setPage(selectedPage);

  return (
    <div>
      <div className="parent">
        <div className="header">
          <h1 style={{ color: "white" }}>welcome to Home page</h1>
          <button className="btn" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
        <div className="container" style={{ wordBreak: "break-word" }}>
          <div className="row">
            <div className="col">
              {listItems.slice(page * 5 - 5, page * 5).map((dataList) => (
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
                  </div>
                  <div className="card-body">
                    {dataList.options.map((option) => (
                      <div className="form-check" key={option.option}>
                        <div className="d-flex justify-content-between">
                          <div
                            style={{
                              wordWrap: "break-word",
                              border: "1px solid lightgray",
                              margin: " 5px",
                              padding: "5px",
                              borderRadius: "10px",
                              width: "100%",
                            }}
                          >
                            <div className="single-option">
                              <input
                                type="radio"
                                onClick={() =>
                                  handleVote(dataList._id, option.option)
                                }
                                name={dataList._id}
                                disabled={disabledOptions[dataList._id]}                              />
                              {option.option}
                            </div>
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
        <Pagination
          count={Math.ceil(listItems.length / 5)}
          color="primary"
          page={page}
          onChange={(event, value) => handlePage(value)}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        />
        <ToastContainer
          position="top-center"
          autoClose={1}
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
  );
};

export default Home;
