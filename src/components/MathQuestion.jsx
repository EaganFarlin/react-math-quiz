import React from "react";

const MathQuestion = ({ question }) => {
  for (let i = 0; i < question.length; i++) {
    console.log(question[i]);
  }

  return (
    <div className="flex flex-col max-w-[33vw]">
      <label
        htmlFor={question.id}
        className="text-slate-700 max-w-full break-words"
      >
        {`${question.nums[0]} ${question.operator} ${question.nums[1]} =`}
      </label>
      <br />
      <input
        id={question.id}
        className="border-2 border-slate-950 rounded-sm"
        type="text"
      />
      <br />
    </div>
  );
};

export default MathQuestion;
