import { useState, useEffect } from 'react';
import './styles.css';

const getNums = () => {
  const list = [];
  for (let i = 1; i <= 8; i++) {
    list.push(i);
    list.push(i);
  }
  return list.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [nums, setNums] = useState(getNums());
  const [stage, setStage] = useState('init');
  const [opened, setOpened] = useState([]);
  const [solvedList, setSolvedList] = useState([]);

  const handleStart = () => {
    setStage('start');
    setSolvedList([]);
    setNums(getNums());
  };

  const handleClick = (index) => {
    if (opened.length === 2) {
      return;
    }
    if (opened.includes(index)) {
      return;
    }
    setOpened((prev) => [...prev, index]);
  };

  useEffect(() => {
    if (opened.length === 2) {
      setTimeout(() => {
        const id1 = opened[0];
        const id2 = opened[1];
        if (nums[id1] === nums[id2]) {
          setSolvedList((prev) => [...prev, nums[id1]]);
        }
        setOpened([]);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  useEffect(() => {
    if (solvedList.length === 8) {
      setStage('win');
    }
  }, [solvedList]);

  const getClassName = (num, index) => {
    if (solvedList.includes(num)) {
      return 'remove';
    } else if (opened.includes(index)) {
      return 'show';
    } else {
      return 'hide';
    }
  };

  return (
    <>
      <h1>Memory Game</h1>
      {stage === 'init' && <button onClick={handleStart}>Play Game</button>}

      {stage === 'start' && (
        <div className='game'>
          <div className='cards'>
            {nums.map((num, i) => (
              <div
                key={i}
                className={`card ${getClassName(num, i)}`}
                onClick={() => handleClick(i)}>
                {num}
              </div>
            ))}
          </div>
        </div>
      )}

      {stage === 'win' && (
        <div>
          <h1>You won the Game!</h1>
          <button onClick={handleStart}>Play Again</button>
        </div>
      )}
    </>
  );
};

export default MemoryGame;
