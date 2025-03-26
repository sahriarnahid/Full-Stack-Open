import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const Button = ({ handleEvent, children }) => {
    return <button onClick={handleEvent}>{children}</button>;
  };

  const [selected, setSelected] = useState(getRandomInt(8));
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function handleNext() {
    setSelected(prevSelected => {
      const newSelected = getRandomInt(8);
      return newSelected;
    });
  }

  function handleVote() {
    setVotes(prevVotes => {
      const updatedVote = { ...prevVotes };
      const key = selected.toString();
      updatedVote[key] += 1;
      return updatedVote;
    });
  }

  const mostVotedAnecdote = () => {
    let maxVotes = 0;
    let maxKey = 0;

    for (const key in votes) {
      if (votes[key] > maxVotes) {
        maxVotes = votes[key];
        maxKey = key;
      }
    }
    return { anecdote: anecdotes[maxKey], votes: maxVotes };
  };
  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]} </div>
      <p>has votes {votes[selected.toString()]}</p>
      <Button handleEvent={handleVote} children={'vote'} />
      <Button handleEvent={handleNext} children={'next anecdotes'} />
      <h2>Anecdote with most votes</h2>
      <div>{mostVotedAnecdote().anecdote}</div>
      <p>has votes {mostVotedAnecdote().votes}</p>
    </>
  );
};

export default App;
