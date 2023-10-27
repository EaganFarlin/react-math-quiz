import { useRef, useState } from "react";
import "bootswatch/dist/zephyr/bootstrap.min.css";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function AddCharBtn({ onModChar, children }) {
  return (
    <button className="btn btn-secondary" onClick={() => onModChar(children)}>
      {children}
    </button>
  );
}

function AddQuestion({ question, onModChar, onAddQuestion }) {
  return (
    <div className="add-question">
      <form onSubmit={onAddQuestion}>
        <label htmlFor="addQuestion" className="form-label">
          Add a question
        </label>
        <br />
        <input
          id="addQuestion"
          className="form-control"
          type="text"
          value={question}
          readOnly
        />
        <input className="btn btn-dark" type="submit" value="Add" />
        <br />
      </form>

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
  );
}

function MathQuestion({ question }) {
  for (let i = 0; i < question.length; i++) {
    console.log(question[i]);
  }

  return (
    <>
      <label htmlFor={question.id} className="form-label">
        {question.nums[0] + question.operator + question.nums[1] + "="}
      </label>
      <br />
      <input id={question.id} className="form-control" type="text" />
      <br />
    </>
  );
}

function QuestionSection({ mathQuestions, onQuestionSubmit }) {
  return (
    <form className="math-questions" onSubmit={onQuestionSubmit}>
      {mathQuestions.map((item) => (
        <MathQuestion key={item.id} question={item} />
      ))}
      <br />
      <input className="btn btn-dark" type="submit" value="Submit" />
    </form>
  );
}

export default function MathQuiz() {
  const [question, setQuestion] = useState("");
  const operators = ["+", "-", "*", "/"];
  const [mathQuestions, setMathQuestions] = useState([]);

  const onModChar = (char) => {
    // console.log(char, typeof char);
    // console.log(Number(char), NaN);

    if (Number(char).toString().includes(NaN)) {
      if (question.length === 0) return;
      if (operators.some((item) => char.includes(item))) {
        if (!operators.some((item) => question.includes(item))) {
          setQuestion((prev) => `${prev} ${char.toString()} `);
        }
      } else {
        setQuestion((prev) =>
          prev.slice(-2, -1) === " " ? prev.slice(0, -2) : prev.slice(0, -1)
        );
      }
    } else {
      setQuestion((prev) => prev + char.toString());
    }
  };

  const onAddQuestion = (e) => {
    e.preventDefault();

    const value = e.currentTarget.addQuestion.value;
    console.log(value);

    if (
      !operators.some((item) => value.includes(item)) ||
      Number(value.slice(-2)).toString().includes(NaN)
    )
      return;

    let firstIn = "",
      operatorIn = "",
      secondIn = "";
    for (let i = 0; i < value.length; i++) {
      let currValChar = value.slice(i, i + 1);
      if (currValChar !== " ") {
        if (
          !operators.some((item) => currValChar.includes(item)) &&
          operatorIn.length === 0
        ) {
          firstIn += currValChar;
        } else if (operators.some((item) => currValChar.includes(item))) {
          operatorIn += currValChar;
        } else {
          secondIn += currValChar;
        }
      }
    }

    let answer;
    switch (operatorIn) {
      case "+":
        answer = Number(firstIn) + Number(secondIn);
        break;
      case "-":
        answer = Number(firstIn) - Number(secondIn);
        break;
      case "*":
        answer = Number(firstIn) * Number(secondIn);
        break;
      case "/":
        answer = Number(firstIn) / Number(secondIn);
        break;
    }

    setMathQuestions((prev) => {
      return [
        ...prev,
        {
          id: uuidv4(),
          nums: [firstIn, secondIn],
          operator: operatorIn,
          answer: answer,
        },
      ];
    });
  };

  const onQuestionSubmit = (e) => {
    e.preventDefault();
    // const id = mathQuestions[0].id;

    mathQuestions.map((item, index) =>
      Number(document.getElementById(item.id).value) === item.answer
        ? document.getElementById(item.id).classList.add("bg-success")
        : document.getElementById(item.id).classList.add("bg-danger")
    );
  };

  return (
    <div className="math-quiz">
      <h1>Math Quiz</h1>
      <AddQuestion
        question={question}
        operators={operators}
        onModChar={onModChar}
        onAddQuestion={onAddQuestion}
      />
      <br />
      <hr />
      <br />
      <QuestionSection
        mathQuestions={mathQuestions}
        onQuestionSubmit={onQuestionSubmit}
      />
    </div>
  );
}
