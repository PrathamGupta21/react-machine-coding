import { useState, useEffect, useRef } from 'react';
import './styles.css';

const Otp = () => {
  const emptyArr = ['', '', '', ''];
  const CODE = '1234';

  const refs = [useRef(), useRef(), useRef(), useRef()];
  const [inputs, setInputs] = useState(emptyArr);
  const [missing, setMissing] = useState(emptyArr);

  useEffect(() => {
    refs[0].current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e, index) => {
    const val = e.target.value;

    if (!Number(val) && val !== '0') {
      return;
    }

    if (index < inputs.length - 1) {
      refs[index + 1].current.focus();
    }

    const copyInputs = [...inputs];
    copyInputs[index] = val;
    setInputs(copyInputs);
  };

  const handleOnKeyDown = (e, index) => {
    if (e.keyCode === 8) {
      const copyInputs = [...inputs];
      copyInputs[index] = '';
      setInputs(copyInputs);

      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData('text');
    if (!Number(data) || data.length !== inputs.length) {
      return;
    }

    const pasteCode = data.split('');
    setInputs(pasteCode);
    refs[inputs.length - 1].current.focus();
  };

  const handleSubmit = () => {
    const missed = inputs
      .map((item, i) => {
        if (item === '') {
          return i;
        }
      })
      .filter((item) => item || item === 0);

    setMissing(missed);

    if (!missed.length) {
      const userInput = inputs.join('');
      const isMatch = userInput === CODE;
      const msg = isMatch ? 'Code is Valid' : 'Code is not Valid';
      alert(msg);
    }
  };

  return (
    <>
      <h1>OTP</h1>
      <div>
        {emptyArr.map((_, i) => {
          return (
            <input
              key={i}
              value={inputs[i]}
              ref={refs[i]}
              type='text'
              maxLength='1'
              onPaste={handlePaste}
              onChange={(e) => handleInputChange(e, i)}
              onKeyDown={(e) => handleOnKeyDown(e, i)}
              className={missing.includes(i) ? 'error' : ''}
            />
          );
        })}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default Otp;
