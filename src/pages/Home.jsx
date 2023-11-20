import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchedAllPolls } from "../redux/reducers/HomeSlice";
import { dispatch } from "../redux/Store";

const Home = () => {
  const listItems = useSelector((state) => state.HomeSlice.data);
  console.log(listItems);
  useEffect(() => {
    dispatch(fetchedAllPolls());
  }, [listItems.isSuccess]);

  return (
    <div >
    <div className="home-page-container">
      <h1>welcome to Home page</h1>
      <div className='container mt-2' style={{ wordWrap: 'break-word' }}>
            <div className="row">
              <div className="col">
              {listItems.map((dataList) => (
                  <div className="card mt-3" key={dataList._id}>
                    <div className="card-header ">
                      <h5 className="card-title" style={{ wordWrap: 'break-word' }}>
                        {dataList.title}
                      </h5>
                      <div className="shift-right d-flex justify-content-around">
                        <i className="fa-regular fa-pen-to-square mx-5"></i>
                        <i className="fa-solid fa-trash"></i>
                      </div>
                    </div>
                    <div className="card-body">
                      {dataList.options.map((option) => (
                        <div className="form-check" key={option.option}>

                            <div className="d-flex justify-content-between">
                            <div className='text-sm text-md-lg text-lg-xl mt-3'
                              style={{ wordWrap: 'break-word' }}>
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
