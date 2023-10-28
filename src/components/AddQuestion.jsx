import React from "react";

import AddCharBtn from "./AddCharBtn";

const AddQuestion = ({ question, onModChar, onAddQuestion }) => {
  return (
    <div className="mb-5">
      <form onSubmit={onAddQuestion}>
        <label htmlFor="addQuestion">Add a question</label>
        <br />
        <input
          id="addQuestion"
          className="border-2 border-slate-950 mt-1 mr-1 rounded-sm"
          type="text"
          value={question}
          readOnly
        />
        <input
          id="addQuestionBtn"
          className="text-white opacity-50 bg-black border-2 border-slate-950 mt-1 rounded p-1 cursor-not-allowed"
          type="submit"
          value="Add"
        />
        <br />
      </form>

      <div className="mt-1">
        <AddCharBtn onModChar={onModChar}>1</AddCharBtn>
        <AddCharBtn onModChar={onModChar}>2</AddCharBtn>
        <AddCharBtn onModChar={onModChar}>3</AddCharBtn>
        <AddCharBtn onModChar={onModChar}>4</AddCharBtn>
        <AddCharBtn onModChar={onModChar}>5</AddCharBtn>
        <br />
        <AddCharBtn onModChar={onModChar}>6</AddCharBtn>
        <AddCharBtn onModChar={onModChar}>7</AddCharBtn>
        <AddCharBtn onModChar={onModChar}>8</AddCharBtn>
        <AddCharBtn onModChar={onModChar}>9</AddCharBtn>
        <AddCharBtn onModChar={onModChar}>0</AddCharBtn>
        <br />
        <AddCharBtn onModChar={onModChar}>+</AddCharBtn>
        <AddCharBtn onModChar={onModChar}>-</AddCharBtn>
        <AddCharBtn onModChar={onModChar}>*</AddCharBtn>
        <AddCharBtn onModChar={onModChar}>/</AddCharBtn>
        <AddCharBtn onModChar={onModChar}>⌫</AddCharBtn>
      </div>
    </div>
  );
};

export default AddQuestion;
