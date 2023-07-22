import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";

const Statistics = ({ good, neutral, bad, totalVotes }) => {
  return (
    <div>
      <h4>statistics</h4>
      {totalVotes <= 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>totalVotes</td>
              <td>{totalVotes}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{(good - bad) / totalVotes}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{((good / totalVotes) * 100).toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);

  const voteGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotalVotes(totalVotes + 1);
  };
  const voteNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotalVotes(totalVotes + 1);
  };
  const voteBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotalVotes(totalVotes + 1);
  };

  return (
    <div className="">
      <h4>give feedback</h4>
      <div>
        <button onClick={voteGood}>good</button>
        <button onClick={voteNeutral}>neutral</button>
        <button onClick={voteBad}>bad</button>
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        totalVotes={totalVotes}
      />
    </div>
  );
}

export default App;
