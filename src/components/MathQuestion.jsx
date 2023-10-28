import React from "react";

const MathQuestion = ({ question }) => {
  for (let i = 0; i < question.length; i++) {
    console.log(question[i]);
  }

  return (
    <div>
      <label htmlFor={question.id} className="text-slate-700 break-words">
        {`${question.nums[0]} ${question.operator} ${question.nums[1]} =`}
      </label>
      <br />
      <input
        id={question.id}
        className="max-w-[33vw] border-2 border-slate-950 rounded-sm"
        type="text"
      />
      <br />
    </div>
  );
};

export default MathQuestion;
