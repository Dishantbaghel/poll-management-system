// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const AddPoll = ({addPoll,setAddPoll, newOptions, setNewOptions, newTitle, setNewTitle }) => {
//   return (
//     <div className="addPoll-parent">
//       <div className="addPoll-parent">
//         <div className="add-poll">
//           <label htmlFor="">Title:</label>
//           <input
//             type="text"
//             className="add-poll-input"
//             value={newPoll.title}
//             onChange={(e) => setNewPoll({ ...newPoll, title: e.target.value })}
//           />
//           <label htmlFor="">Options:</label>
//           {newPoll.options.map((option, index) => (
//             <div key={index}>
//               <input
//                 type="text"
//                 className="add-poll-input"
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//               />
//             </div>
//           ))}
//           <button onClick={handleAddOption}>Add Option</button>
//           <button onClick={handleAddPollSubmit}>Submit</button>
//           <button onClick={() => setAddPoll(false)}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddPoll;
