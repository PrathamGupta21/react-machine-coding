import { useState, useEffect } from 'react';
import './styles.css';

const AutoSuggest = () => {
  const [food, setFood] = useState('');
  const [shoppingList, setShoppingList] = useState([]);
  const [bucketList, setBucketList] = useState([]);

  useEffect(() => {
    const fetchItems = async (food) => {
      const url = `https://api.frontendeval.com/fake/food/${food}`;
      try {
        const result = await fetch(url);
        if (result.status === 200) {
          const data = await result?.json();
          setShoppingList(data);
        }
      } catch (err) {
        console.error('Error: ', err);
      }
    };

    if (food.length >= 2) {
      fetchItems(food);
    }
  }, [food]);

  const handleShoppingList = (e) => {
    const idx = e.target.getAttribute('data-id');
    if (idx) {
      const obj = {
        id: Date.now(),
        data: shoppingList[idx],
        isDone: false,
      };
      const copyBucketList = [...bucketList];
      copyBucketList.push(obj);
      setBucketList(copyBucketList);
    }
    setFood('');
  };

  const handleUpdate = (id) => {
    const copyBucketList = [...bucketList];
    const newBucketList = copyBucketList.map((item) => {
      if (item.id == id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setBucketList(newBucketList);
  };

  const handleDelete = (id) => {
    const copyBucketList = [...bucketList];
    const newBucketList = copyBucketList.filter((item) => item.id != id);
    setBucketList(newBucketList);
  };

  const handleActions = (e) => {
    const action = e.target.getAttribute('data-id');
    const [type, id] = action.split(':');
    if (type === 'update') {
      handleUpdate(id);
    } else if (type === 'delete') {
      handleDelete(id);
    }
  };

  return (
    <>
      <h1>Auto Suggest</h1>
      <div>
        <input value={food} onChange={(e) => setFood(e.target.value)} />
      </div>

      {food.length >= 2 && shoppingList.length >= 2 ? (
        <div className='shopping-list' onClick={handleShoppingList}>
          {shoppingList.map((item, index) => {
            return (
              <div key={item.id} data-id={index} className='product'>
                {item}
              </div>
            );
          })}
        </div>
      ) : null}

      <div className='bucket' onClick={handleActions}>
        {bucketList.map((item) => {
          return (
            <div key={item.id} className='shopping-item'>
              <button data-id={`update:${item.id}`}>✓</button>
              <div className={item.isDone ? 'strike' : ''}>{item.data}</div>
              <button data-id={`delete:${item.id}`}>X</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AutoSuggest;
