import Result from "./Result";
import Timer from "./Timer";

function Question({ question, dispatch, answer, result, timeRemaining }) {
  const hasAnswer = answer !== null;
  function handleAnswer(index1) {
    if (index1 === question.correctOption) {
      dispatch({ type: "addResult" });
    }
    dispatch({
      type: "newAnswer",
      payload: index1,
    });
  }

  return (
    <div>
      <Result result={result} />
      <h2>{question.question}</h2>

      <div>
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswer
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={hasAnswer}
            onClick={() => handleAnswer(index)}
          >
            {option}
          </button>
        ))}
      </div>

      <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
        NEXT
      </button>
      <Timer timeRemaining={timeRemaining} dispatch={dispatch} />
    </div>
  );
}

export default Question;
