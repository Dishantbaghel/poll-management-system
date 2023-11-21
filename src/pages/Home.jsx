import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchedAllPolls } from "../redux/reducers/HomeSlice";
import { dispatch } from "../redux/Store";
import "./home.css";

const Home = () => {
  const listItems = useSelector((state) => state.HomeSlice.data);
  console.log(listItems);
  useEffect(() => {
    dispatch(fetchedAllPolls());
  }, [listItems.isSuccess]);

  return (
    <div className="home-parent">
      <div className="home-page-container">
        <h1>welcome to Home page</h1>
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
                  </div>
                  <div className="card-body">
                    {dataList.options.map((option) => (
                      <div className="form-check" key={option.option}>
                        <div className="d-flex justify-content-between">
                          <div
                            className="text-sm text-md-lg text-lg-xl mt-3"
                            // className="poll-options"
                            style={{ wordWrap: "break-word" }}
                          >
                            <input type="radio" name={dataList._id} />
                            {option.option}
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

export default Home;
