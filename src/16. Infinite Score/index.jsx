import { useState, useRef, useEffect, useCallback } from 'react';

const InfiniteScroll = () => {
  const loaderRef = useRef();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (index) => {
    try {
      const url = `https://jsonplaceholder.typicode.com/photos?_page=${index}&_limit=9`;
      const result = await fetch(url);
      const data = await result.json();
      return data;
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  const fetchFirstPage = async () => {
    const data = await fetchImages(1);
    setImages(data);
  };

  useEffect(() => {
    fetchFirstPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const data = await fetchImages(page);
    setImages((prevImages) => [...prevImages, ...data]);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    setPage((prevPage) => prevPage + 1);
  }, [page, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        getData();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(loaderRef.current);
      }
    };
  }, [getData]);

  return (
    <div className='App'>
      <h1>Infite Scrolling</h1>
      {images?.map((image, index) => (
        <img key={index} alt={image.title} src={image.thumbnailUrl} />
      ))}
      <div ref={loaderRef}>{loading && <h2>Loading...</h2>}</div>
    </div>
  );
};

export default InfiniteScroll;
