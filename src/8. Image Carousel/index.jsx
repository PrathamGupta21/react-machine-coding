import { useState, useEffect } from 'react';
import './styles.css';

const Carousel = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const url = 'https://www.reddit.com/r/aww/top/.json?t=all';
      setLoading(true);
      try {
        const res = await fetch(url);
        const result = await res.json();
        const data = result.data.children;
        const list = data
          .filter((item) => item.data.url_overridden_by_dest.includes('.jpg'))
          .map((item) => item.data.url_overridden_by_dest);
        setImages(list);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleClick = (dir) => {
    const lastIdx = images.length - 1;
    if (dir === 'left') {
      if (index === 0) {
        setIndex(lastIdx);
      } else {
        setIndex((idx) => idx - 1);
      }
    } else if (dir === 'right') {
      if (lastIdx === index) {
        setIndex(0);
      } else {
        setIndex((idx) => idx + 1);
      }
    }
  };

  useEffect(() => {
    const tid = setInterval(() => {
      handleClick('right');
    }, 3000);

    return () => {
      clearInterval(tid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div className='App'>
      {loading ? (
        <div>Loading ....</div>
      ) : (
        <>
          <button onClick={() => handleClick('left')}>{'<'}</button>
          <img src={images[index]} alt='not-found' />
          <button onClick={() => handleClick('right')} className='right'>
            {'>'}
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
