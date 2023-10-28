import React from "react";

const AddCharBtn = ({ color, onModChar, children }) => {
  return (
    <button
      className={"w-9 h-9 mr-1 mb-1 border-2 border-slate-600 rounded " + color}
      onClick={() => onModChar(children)}
    >
      {children}
    </button>
  );
};

AddCharBtn.defaultProps = {
  color: "bg-slate-50 hover:bg-slate-100 active:bg-slate-200",
};

export default AddCharBtn;
