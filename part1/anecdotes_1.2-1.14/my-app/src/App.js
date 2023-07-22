import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};
const MostVotes = ({ anecdotes, votes }) => {
  const maxIndex = votes.indexOf(Math.max(...votes));
  return (
    <>
      {votes[maxIndex] === 0 ? (
        <p>No votes so far</p>
      ) : (
        <div>
          <p>{anecdotes[maxIndex]}</p>
          <span>Has {votes[maxIndex]} votes</span>
        </div>
      )}
    </>
  );
};

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  console.log(votes, "vote count");

  const randomAnecdote = () => {
    const startingSelected = selected;
    let randomNumber = Math.floor(Math.random() * anecdotes.length);

    while (startingSelected === randomNumber) {
      randomNumber = Math.floor(Math.random() * anecdotes.length);
    }

    console.log(randomNumber, "random number");
    setSelected(randomNumber);
  };
  const voteAnecdote = () => {
    const updatedVote = [...votes];
    console.log("pre updVotes", updatedVote);
    //increment currently selected anecdote vote + 1
    updatedVote[selected] += 1;
    //update votes state
    setVotes(updatedVote);
    console.log("voted for", selected);
    console.log("updatedVotes", updatedVote);
  };

  return (
    <div>
      <h4>Random anecdote</h4>
      <p>{anecdotes[selected]}</p>
      <Button handleClick={randomAnecdote} text="next anecdote" />
      <Button handleClick={voteAnecdote} text="vote best" />
      <h4>Anecdote with most votes</h4>
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  );
}

export default App;
