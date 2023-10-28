import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

import AddQuestion from "./components/AddQuestion";
import QuestionSection from "./components/QuestionSection";
import Footer from "./components/Footer";

export default function MathQuiz() {
  const [question, setQuestion] = useState("");
  const operators = ["+", "-", "*", "/"];
  const [mathQuestions, setMathQuestions] = useState([]);

  const onModChar = (char) => {
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

      if (
        operators.some((item) => question.includes(item)) &&
        !Number(question.slice(-1)).toString().includes(NaN)
      ) {
        document
          .getElementById("addQuestionBtn")
          .classList.remove("opacity-50", "cursor-not-allowed");
        document
          .getElementById("addQuestionBtn")
          .classList.add(
            "cursor-pointer",
            "hover:bg-slate-900",
            "active:bg-slate-800"
          );
      }
    }
  };

  const onAddQuestion = (e) => {
    e.preventDefault();

    if (
      !operators.some((item) => question.includes(item)) ||
      Number(question.slice(-2)).toString().includes(NaN)
    )
      return;

    setQuestion("");

    let firstIn = "",
      operatorIn = "",
      secondIn = "";
    for (let i = 0; i < question.length; i++) {
      let currValChar = question.slice(i, i + 1);
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

    document
      .getElementById("addQuestionBtn")
      .classList.add("opacity-50", "cursor-not-allowed");
    document
      .getElementById("addQuestionBtn")
      .classList.remove(
        "cursor-pointer",
        "hover:bg-slate-900",
        "active:bg-slate-800"
      );
  };

  const onQuestionSubmit = (e) => {
    e.preventDefault();

    mathQuestions.map((item) => {
      if (Number(document.getElementById(item.id).value) === item.answer) {
        document.querySelector(
          `label[for='${item.id}']`
        ).innerHTML = `${item.nums[0]} ${item.operator} ${item.nums[1]} =`;

        document
          .getElementById(item.id)
          .classList.remove("bg-red-500", "text-white");
        document
          .getElementById(item.id)
          .classList.add("bg-green-500", "text-white");
      } else {
        document.querySelector(
          `label[for='${item.id}']`
        ).innerHTML = `${item.nums[0]} ${item.operator} ${item.nums[1]} = <span class="font-bold">${item.answer}</span>`;

        document
          .getElementById(item.id)
          .classList.remove("bg-green-500", "text-white");
        document
          .getElementById(item.id)
          .classList.add("bg-red-500", "text-white");
      }
    });
  };

  return (
    <div className="min-w-full min-h-[100vh] flex justify-center items-center py-[2%] font-sans">
      <div className="max-w-xs">
        <div className="relative left-[50%] translate-x-[-50%] mb-8">
          <div>
            <h1 className="text-4xl font-bold underline mb-2">Math Quiz</h1>
          </div>
          <AddQuestion
            question={question}
            operators={operators}
            onModChar={onModChar}
            onAddQuestion={onAddQuestion}
          />
          <QuestionSection
            mathQuestions={mathQuestions}
            onQuestionSubmit={onQuestionSubmit}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}
