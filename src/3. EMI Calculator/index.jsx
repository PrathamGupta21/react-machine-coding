import { useState } from 'react';
import './styles.css';

const EmiCalculator = () => {
  const [principle, setPrinciple] = useState(0);
  const [interest, setInterest] = useState(0);
  const [years, setYears] = useState(0);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = parseInt(e.target.value);
    if (id === 'principle') {
      setPrinciple(value);
    } else if (id === 'interest') {
      setInterest(value);
    } else {
      setYears(value);
    }
  };

  const calculateEMI = () => {
    let r = interest;
    if (principle && r && years) {
      r = r / 12 / 100;
      const calcPow = Math.pow(1 + r, years * 12);
      const amount = principle * ((r * calcPow) / (calcPow - 1));
      return Math.round(amount);
    }
    return 0;
  };

  return (
    <>
      <div className='loan-calc'>
        <h1>EMI Calculator</h1>

        <div className='inputs'>
          <p>Principle Amount:</p>
          <input onChange={handleChange} type='number' id='principle' />

          <p>Rate of Interest:</p>
          <input onChange={handleChange} type='number' id='interest' />

          <p>Years:</p>
          <input onChange={handleChange} type='number' id='year' />
        </div>

        <div className='output'>Your EMI is {calculateEMI()}.</div>
      </div>
    </>
  );
};

export default EmiCalculator;
