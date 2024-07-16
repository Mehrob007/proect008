import React, { useState } from 'react';
import axios from 'axios';
import useStore from '../stores/useStore';

const Form = () => {
  const [formData, setFormData] = useState({ field1: '', field2: '', field3: '', field4: '', field5: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addData } = useStore();
  const [additionalFields, setAdditionalFields] = useState([]);

  const addNewWork = () => {
    const totalFields = Object.keys(formData).length
    if (totalFields < 15) {
      const newFieldName = `field${totalFields + 1}`;
      setAdditionalFields([...additionalFields, newFieldName]);
      setFormData(prevData => ({ ...prevData, [newFieldName]: '' }));
    } else {
      alert("Вы не можете добавить больше 15 полей.");
    }
  };
  const handleDelete = (fieldName) => {
    const totalFields = Object.keys(formData).length
    if (totalFields - 1 < 5) {
      alert("Вы не можете удалить изначальные поля.");
      return;
    }
    const updatedFormData = { ...formData };
    delete updatedFormData[fieldName];
    setFormData(updatedFormData);
    setAdditionalFields(additionalFields.filter(field => field !== fieldName));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('https://776614bb5bcaaaa6.mokky.dev/info1', formData);
      addData([response.data]);
      setFormData({ field1: '', field2: '', field3: '', field4: '', field5: '' });
      setAdditionalFields([]);
    } catch (error) {
      console.error("Failed to submit data", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button onClick={addNewWork} className='mt-2 w-full border px-5 py-2 bg-green-500 font-bold text-white'>
        Добавить новое поле
      </button>
      <form className="form-container flex-col gap-2" onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value], index) => (
          <div className='relative' key={index}>
            <input 
              key={key}
              type="text" 
              className='w-full outline-none border p-3' 
              name={key} 
              value={value}
              onChange={handleChange} 
              required 
              placeholder={`Поле ${index + 1}`} 
            />
            <button
            type="button"
            className="px-3 absolute top-2 right-2 py-1 bg-red-500 text-white font-bold"
            onClick={() => handleDelete(key)}
          >
            Удалить
          </button>
        </div>))}
        <button 
          type="submit" 
          className='mt-2 w-full border px-5 py-2 bg-green-500 font-bold text-white' 
          disabled={isSubmitting}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;

{/* <input type="text" className='w-full outline-none border p-3' name="field1" value={formData.field1} onChange={handleChange} required placeholder="Поле 1" />
      <input type="text" className='w-full outline-none border p-3' name="field2" value={formData.field2} onChange={handleChange} required placeholder="Поле 2" />
      <input type="text" className='w-full outline-none border p-3' name="field3" value={formData.field3} onChange={handleChange} required placeholder="Поле 3" />
      <input type="text" className='w-full outline-none border p-3' name="field4" value={formData.field4} onChange={handleChange} required placeholder="Поле 4" />
      <input type="text" className='w-full outline-none border p-3' name="field5" value={formData.field5} onChange={handleChange} required placeholder="Поле 5" /> */}