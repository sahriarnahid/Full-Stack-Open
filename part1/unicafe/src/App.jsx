import { useState } from 'react';

const Button = ({ handleClick, type }) => {
  return <button onClick={handleClick}>{type}</button>;
};

const Statistics = ({ good, neutral, bad, total }) => {
  if (total > 0) {
    return (
      <>
        <h3>statistics</h3>
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
              <td>all</td>
              <td>{total}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>
                {((good * 1 + neutral * 0 + bad * -1) / total).toFixed(1)}
              </td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{((good / total) * 100).toFixed(1)} %</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <>
        <h3>statistics</h3>
        <p>No Feedback is given</p>
      </>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  function handleIncreaseGood() {
    setGood(good => good + 1);
    setTotal(t => t + 1);
  }

  function handleIncreaseNeutral() {
    setNeutral(neutral => neutral + 1);
    setTotal(t => t + 1);
  }

  function handleIncreaseBad() {
    setBad(bad => bad + 1);
    setTotal(t => t + 1);
  }

  return (
    <div>
      <h3>give feedback</h3>
      <Button handleClick={handleIncreaseGood} type={'Good'} />
      <Button handleClick={handleIncreaseNeutral} type={'Neutral'} />
      <Button handleClick={handleIncreaseBad} type={'Bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};

export default App;
