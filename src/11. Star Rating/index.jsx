import { useState } from 'react';
import './styles.css';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <>
      <h1>Star Rating</h1>
      <div>
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => setRating(num)}
            onMouseOver={() => setHover(num)}
            onMouseLeave={() => setHover(rating)}>
            <span
              className={`star ${
                num <= ((rating && hover) || hover) ? 'on' : 'off'
              }`}>
              &#9733;
            </span>
          </button>
        ))}
      </div>
    </>
  );
};

export default StarRating;
