import React from "react";

import MathQuestion from "./MathQuestion";

const QuestionSection = ({ mathQuestions, onQuestionSubmit }) => {
  if (mathQuestions.length === 0) return;

  return (
    <div>
      <hr />

      <form className="mt-3" onSubmit={onQuestionSubmit}>
        {mathQuestions.map((item) => (
          <MathQuestion key={item.id} question={item} />
        ))}
        <br />
        <input
          className="text-white bg-black border-2 border-slate-950 mt-1 rounded p-1 cursor-pointer hover:bg-slate-900 active:bg-slate-800"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default QuestionSection;
