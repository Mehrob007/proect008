
import React, { useState } from 'react';
import axios from 'axios';
import useStore from '../stores/useStore';

const Form = () => {
  const [formData, setFormData] = useState({ field1: '', field2: '', field3: '', field4: '', field5: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addData } = useStore();

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
    } catch (error) {
      console.error("Failed to submit data", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input type="text" name="field1" value={formData.field1} onChange={handleChange} required placeholder="Поле 1" />
      <input type="text" name="field2" value={formData.field2} onChange={handleChange} required placeholder="Поле 2" />
      <input type="text" name="field3" value={formData.field3} onChange={handleChange} required placeholder="Поле 3" />
      <input type="text" name="field4" value={formData.field4} onChange={handleChange} required placeholder="Поле 4" />
      <input type="text" name="field5" value={formData.field5} onChange={handleChange} required placeholder="Поле 5" />
      <button type="submit" disabled={isSubmitting}>Submit</button>
    </form>
  );
};

export default Form;
