import Main from "./Main";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import Question from "./Question";

function App() {
  const initialstate = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    result: 0,
    timeRemaining: 60,
  };
  function reducer(state, action) {
    switch (action.type) {
      case "ready":
        return { ...state, questions: action.payload, status: "ready" };
      case "error":
        return { ...state, status: "error" };
      case "active":
        return { ...state, status: "active", timeRemaining: 60 };
      case "next":
        return { ...state, index: state.index + 1, answer: null };
      case "newAnswer":
        return { ...state, answer: action.payload };
      case "addResult":
        return { ...state, result: state.result + 1 };
      case "tick":
        return { ...state, timeRemaining: state.timeRemaining - 1 };
      case "tok":
        return { ...state, timeRemaining: 0, status: "ready" };
      default:
        return;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialstate);
  const { questions, status, index, answer, result, timeRemaining } = state;
  const numOfQuestions = questions.length;
  useEffect(() => {
    async function getquestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "ready", payload: data });
        console.log(data);
      } catch (e) {
        dispatch({ type: "error" });
      }
    }
    getquestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numOfQuestions={numOfQuestions} />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
            result={result}
            timeRemaining={timeRemaining}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
