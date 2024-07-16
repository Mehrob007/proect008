
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
    <div className="table-container mt-5">
      <InfiniteScroll
        loadMore={loadMoreData}
        hasMore={!isLoading && hasMore}
        loader={<div key={0}>Loading...</div>}
      >
        <table className='w-full border-collapse'>
          <thead>
            
            <tr className='fields bg-green-500 text-white'>
              <th className='p-2 border border-gray-300'>Поле 1</th>
              <th className='p-2 border border-gray-300'>Поле 2</th>
              <th className='p-2 border border-gray-300'>Поле 3</th>
              <th className='p-2 border border-gray-300'>Поле 4</th>
              <th className='p-2 border border-gray-300'>Поле 5</th>
              <th className='p-2 border border-gray-300'>Поле 6</th>
              <th className='p-2 border border-gray-300'>Поле 7</th>
              <th className='p-2 border border-gray-300'>Поле 8</th>
              <th className='p-2 border border-gray-300'>Поле 9</th>
              <th className='p-2 border border-gray-300'>Поле 10</th>
              <th className='p-2 border border-gray-300'>Поле 11</th>
              <th className='p-2 border border-gray-300'>Поле 12</th>
              <th className='p-2 border border-gray-300'>Поле 13</th>
              <th className='p-2 border border-gray-300'>Поле 14</th>
              <th className='p-2 border border-gray-300'>Поле 15</th>
            </tr>
          </thead>
         
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className='class="p-2 border border-gray-300"'>{item.field1}</td>
                <td className='class="p-2 border border-gray-300"'>{item.field2}</td>
                <td className='class="p-2 border border-gray-300"'>{item.field3}</td>
                <td className='class="p-2 border border-gray-300"'>{item.field4}</td>
                <td className='class="p-2 border border-gray-300"'>{item.field5}</td>
                <td className='class="p-2 border border-gray-300"'>{item.field6}</td>
                <td className='class="p-2 border border-gray-300"'>{item.field7}</td>
                <td className='class="p-2 border border-gray-300"'>{item.field8}</td>
                <td className='class="p-2 border border-gray-300"'>{item.field9}</td>
                <td className='class="p-2 border border-gray-300"'>{item.field10}</td>
                <td className='class="p-2 border border-gray-300"'>{item.field11}</td>
                <td className='class="p-2 border border-gray-300"'>{item.field12}</td>
                <td className='class="p-2 border border-gray-300"'>{item.field13}</td>
                <td className='class="p-2 border border-gray-300"'>{item.field14}</td>
                <td className='class="p-2 border border-gray-300"'>{item.field15}</td>
              </tr>
            ))}
          </tbody> 
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default Table;
