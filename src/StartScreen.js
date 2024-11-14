function StartScreen({ numOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2> welcome to react quiz</h2>
      <h3>Num of quesions is {numOfQuestions}</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "active" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
