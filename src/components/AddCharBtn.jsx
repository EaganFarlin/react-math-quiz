import React from "react";

const AddCharBtn = ({ onModChar, children }) => {
  return (
    <button
      className="w-9 h-9 border-2 border-slate-600 rounded hover:bg-slate-50 active:bg-slate-200"
      onClick={() => onModChar(children)}
    >
      {children}
    </button>
  );
};

export default AddCharBtn;
