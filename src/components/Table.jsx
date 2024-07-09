
import React, { useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import useStore from '../stores/useStore';

const Table = () => {
  const { data, isLoading, hasMore,  addData, setLoading, setHasMore, } = useStore();

  useEffect(() => {
    loadMoreData();
  }, []);

  const loadMoreData = async () => {
    if (isLoading) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://776614bb5bcaaaa6.mokky.dev/info1`);
      const newData = response.data;
      addData(newData);
      setHasMore(newData.length > 0);
    } catch (error) {

      console.error("Failed to load data", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="table-container">
      <InfiniteScroll
        loadMore={loadMoreData}
        hasMore={!isLoading && hasMore}
        loader={<div key={0}>Loading...</div>}
      >
        <table>
          <thead>
            <tr className='fields'>
              <th>Поле 1</th>
              <th>Поле 2</th>
              <th>Поле 3</th>
              <th>Поле 4</th>
              <th>Поле 5</th>
            </tr>
          </thead>
         
          <tbody>
            { data.map((item, index) => (
              <tr key={index}>
                <td>{item.field1}</td>
                <td>{item.field2}</td>
                <td>{item.field3}</td>
                <td>{item.field4}</td>
                <td>{item.field5}</td>
              </tr>
            ))}
          </tbody> 
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default Table;
