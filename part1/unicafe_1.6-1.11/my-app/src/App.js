import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad, totalVotes }) => {
  return (
    <div>
      <h4>statistics</h4>
      {totalVotes <= 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="totalVotes" value={totalVotes} />
            <StatisticLine
              text="average"
              value={((good - bad) / totalVotes).toFixed(2)}
            />
            <StatisticLine
              text="neutral"
              value={`${((good / totalVotes) * 100).toFixed(2)} %`}
            />
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
        <Button handleClick={voteGood} text="good" />
        <Button handleClick={voteNeutral} text="neutral" />
        <Button handleClick={voteBad} text="bad" />
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
