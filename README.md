
# Infinite Scroll Table
Этот проект представляет собой простое приложение React, которое отображает таблицу с данными, загруженными из API с использованием бесконечной прокрутки. В нем используется axios для извлечения данных и react-infinite-scroller для работы с бесконечной прокруткой.
Особенности
Бесконечная прокрутка: Автоматически загружается больше данных по мере того, как пользователь прокручивает страницу вниз.
Выборка данных: Использует axios для извлечения данных из конечной точки API.
Управление состоянием: Использует пользовательский интерфейс (use Store) для управления состоянием приложения.
Динамические заголовки таблиц: Динамически генерирует заголовки таблиц на основе полученных данных.
Обработка ошибок: Базовая обработка ошибок при неудачной выборке данных.

Установка
Клонировать репозиторий:

```
git clone https://github.com/Mehrob007/proect008.git
cd proect008
```

Устанавливать зависимости:
```
npm i

```

Запустите приложение:
```
npm start
```

Структура проекта
`src/components/Table.jsx`: Основной компонент, который отображает таблицу с бесконечной прокруткой.
`src/stores/useStore.js`: Пользовательский интерфейс для управления состоянием приложения.
`src/index.js`: Точка входа в приложение.

Использование
Табличный компонент (`Table.jsx`)
Компонент `Table` отвечает за отображение таблицы и обработку бесконечной прокрутки.

Ключевые части:
Управление состоянием:

```
const { data, isLoading, hasMore, addData, setLoading, setHasMore } = useStore();

```
Пользовательский интерфейс `useStore` управляет состоянием таблицы, включая данные, статус загрузки и наличие дополнительных данных для загрузки.

Выборка данных:

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
Функция `loadMoreData` извлекает данные из API и соответствующим образом обновляет состояние.

Вывод таблицы:

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

Заголовки таблиц динамически генерируются из ключей данных. Каждая ячейка отображается с помощью `renderCellValue`, чтобы объекты отображались корректно в виде строк.

Пользовательский переход (`useStore.js`)
Пользовательский переход `useStore` управляет состоянием таблицы.

Ключевые части:
Переменные состояния:

```
const [data, setData] = useState([]);
const [isLoading, setLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);
```

Эти переменные состояния отслеживают данные таблицы, статус загрузки и наличие дополнительных данных.

Функции управления состоянием:

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
Функция `addData` добавляет новые данные к существующему массиву данных. Другие функции управляют статусом загрузки и доступностью дополнительных данных.

Способствующий
Мы приветствуем ваши предложения! Пожалуйста, откройте проблему или отправьте запрос на внесение изменений или улучшений.


Это руководство для чтения содержит исчерпывающий обзор проекта, его функций и способов его настройки. Оно также содержит пояснения к ключевым частям кода, что облегчает понимание проекта другими пользователями и позволяет им вносить свой вклад в проект.
