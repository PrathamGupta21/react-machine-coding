import { useState } from 'react';
import './styles.css';

function UndoableCounter() {
  const [value, setValue] = useState(0);
  const [redoList, setRedoList] = useState([]);
  const [history, setHistory] = useState([]);

  const maintainHistory = (key, prev, curr) => {
    const obj = {
      action: key,
      prev,
      curr,
    };
    const copyHistory = [...history];
    copyHistory.unshift(obj);
    setHistory(copyHistory);
  };

  const handleClick = (key) => {
    const val = parseInt(key);
    maintainHistory(key, value, val + value);
    setValue((existingValue) => existingValue + val);
  };

  const handleUndo = () => {
    if (history.length) {
      const copyHist = [...history];
      const firstItem = copyHist.shift();
      setHistory(copyHist);

      setValue(firstItem.prev);

      const copyRedoList = [...redoList];
      copyRedoList.push(firstItem);
      setRedoList(copyRedoList);
    }
  };

  const handleRedo = () => {
    if (redoList.length) {
      const copyRedoList = [...redoList];
      const poppedValue = copyRedoList.pop();
      setRedoList(copyRedoList);
      const { action, prev, curr } = poppedValue;
      setValue(curr);
      maintainHistory(action, prev, curr);
    }
  };

  return (
    <>
      <h1>Undoable Counter</h1>
      <div className='action-btn'>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>

      <div className='user-actions'>
        {['-100', '-10', '-1'].map((btn) => {
          return (
            <button key={btn} onClick={() => handleClick(btn)}>
              {btn}
            </button>
          );
        })}
        <div style={{ fontSize: 40, margin: '10px' }}>{value}</div>
        {['+1', '+10', '+100'].map((btn) => {
          return (
            <button key={btn} onClick={() => handleClick(btn)}>
              {btn}
            </button>
          );
        })}
      </div>

      <div className='history'>
        {history.map((item, i) => {
          return (
            <div key={i} className='row'>
              <div>{item.action}</div>
              <div>{`[ ${item.prev} -> ${item.curr} ]`}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UndoableCounter;
