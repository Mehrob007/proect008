
Infinite Scroll Table
This project is a simple React application that displays a table with data loaded from an API using infinite scrolling. It leverages axios for data fetching and react-infinite-scroller for handling infinite scroll functionality.

Features
Infinite Scrolling: Automatically loads more data as the user scrolls down.
Data Fetching: Uses axios to fetch data from an API endpoint.
State Management: Utilizes a custom hook (useStore) for managing application state.
Dynamic Table Headers: Dynamically generates table headers based on the fetched data.
Error Handling: Basic error handling for failed data fetches.

Installation
Clone the repository:

```
git clone https://github.com/Mehrob007/proect008.git
cd proect008
```

Install dependencies:

```
npm i

```

Run the application:

```
npm start
```

Project Structure
`src/components/Table.jsx`: Main component that renders the table with infinite scroll.
`src/stores/useStore.js`: Custom hook for managing application state.
`src/index.js`: Entry point of the application.

Usage
Table Component (`Table.jsx`)
The  `Table` component is responsible for rendering the table and handling infinite scrolling.

Key Parts:
State Management:

```
const { data, isLoading, hasMore, addData, setLoading, setHasMore } = useStore();

```
The custom hook `useStore` manages the state of the table, including the data, loading status, and whether there is more data to load.

Data Fetching:

```
const loadMoreData = async () => {
  if (isLoading) return;
  setLoading(true);
  try {
    const response = await axios.get('https://776614bb5bcaaaa6.mokky.dev/info1');
    const newData = response.data;
    addData(newData);
    setHasMore(newData.length > 0);
  } catch (error) {
    console.error("Failed to load data", error);
  } finally {
    setLoading(false);
  }
};
```
The `loadMoreData` function fetches data from the API and updates the state accordingly.

Table Rendering:

```
const renderCellValue = (value) => {
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return value;
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
            {headers.map((header, index) => (
              <th key={index} className='p-2 border border-gray-300'>{`Поле ${index + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex} className='p-2 border border-gray-300'>
                  {renderCellValue(item[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  </div>
);
```

The table headers are dynamically generated from the data keys. Each cell is rendered with `renderCellValue` to ensure objects are displayed correctly as strings.

Custom Hook (`useStore.js`)
The `useStore` custom hook manages the state for the table.

Key Parts:
State Variables:

```
const [data, setData] = useState([]);
const [isLoading, setLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);
```

These state variables keep track of the table data, loading status, and whether more data is available.

State Management Functions:

```
const addData = (newData) => {
  setData(prevData => [...prevData, ...newData]);
};

return {
  data,
  isLoading,
  hasMore,
  addData,
  setLoading,
  setHasMore,
};
```
The `addData` function appends new data to the existing data array. Other functions manage the loading status and availability of more data.

Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes or enhancements.


This README provides a comprehensive overview of the project, its features, and how to set it up. It also includes explanations of the key parts of the code, making it easier for others to understand and contribute to the project.
