import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchedAllPolls } from "../redux/reducers/HomeSlice";
import { dispatch } from "../redux/Store";
import { useNavigate } from 'react-router-dom'
import "./home.css";

const Home = () => {
  const listItems = useSelector((state) => state.HomeSlice.data);
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchedAllPolls());
  }, [listItems.isSuccess]);

  const handleLogOut=()=>{
    navigate('/SignIn')
  }

  return (
    <div >
      <div className="home-page-container">
      <div className="header">
        <h1 style={{color:'white'}}>welcome to Home page</h1>
        <button className="btn" onClick={handleLogOut} >Log Out</button>
      </div>
        <div className="container mt-2" style={{ wordBreak: "break-word" }}>
          <div className="row">
            <div className="col">
              {listItems.map((dataList) => (
                <div className="card mt-3" key={dataList._id}>
                  <div className="card-header " style={{backgroundColor:'lightgray'}}>
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
                            // className="text-sm text-md-lg text-lg-xl mt-3 "
                            // className="poll-options"
                            style={{ wordWrap: "break-word",border: "1px solid lightgray",margin:" 5px",padding: "5px",borderRadius:"10px",width:"100%" }}
                          >
                          <div className="single-option">
                            <input type="radio" name={dataList._id} />
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
      </div>
    </div>
  );
};

export default Home;
