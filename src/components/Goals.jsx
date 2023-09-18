import React, { useState, useEffect } from 'react';

function Goals() {
  const [goal, setGoal] = useState('');
  const [goalList, setGoalList] = useState([]);

  // Load goalList from localStorage on component mount
  useEffect(() => {
    const storedGoalList = JSON.parse(localStorage.getItem('goalList'));
    if (storedGoalList) {
      setGoalList(storedGoalList);
    }
  }, []);

  // Update localStorage whenever goalList changes
  useEffect(() => {
    localStorage.setItem('goalList', JSON.stringify(goalList));
  }, [goalList]);

  const handleInputChange = (e) => {
    setGoal(e.target.value);
  };

  const addGoal = () => {
    if (goal.trim() !== '') {
      setGoalList([...goalList, goal]);
      setGoal(''); // Clear the input field
    }
  };

  const deleteGoal = (index) => {
    // Create a copy of goalList without the goal to be deleted
    const updatedGoalList = [...goalList];
    updatedGoalList.splice(index, 1);
    setGoalList(updatedGoalList);
  };

  return (
    <div className="App">
      <h2>Goals</h2>
      <ul>
        {goalList.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => deleteGoal(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Enter a goal"
          value={goal}
          onChange={handleInputChange}
        />
        <button onClick={addGoal}>Add Goal</button>
      </div>
    </div>
  );
}

export default Goals;
