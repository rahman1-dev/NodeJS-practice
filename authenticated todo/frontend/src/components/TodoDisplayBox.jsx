import React from "react";

const TodoDisplayBox = ({ todo }) => {
  const { title, status } = todo;
  // console.log(title, status);
  return (
    <div className="text-black mt-5 w-full flex justify-center">
      <div className="TodoDisplayBox w-[47vw] rounded h-10 bg-white text-black flex justify-between items-center px-3">
        <div>
          <h3>{title}</h3>
        </div>
        {/* <h3 className="bg-gray-700 text-white p-1 rounded">
          {status ? "Done" : "Pending"}
        </h3> */}

        <div>
          <button className="bg-amber-300">edit</button>
          <button className="bg-red-500">delete</button>
        </div>
      </div>
    </div>
  );
};

export default TodoDisplayBox;
