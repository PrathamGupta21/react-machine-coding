import { useState } from 'react';
import './styles.css';

const MultiStepForm = () => {
  const forms = [
    {
      id: 'name',
      label: 'Name',
      inputType: 'text',
      buttonName: 'Next',
      placeholder: 'Your Name...',
    },
    {
      id: 'email',
      label: 'Email',
      inputType: 'email',
      buttonName: 'Next',
      placeholder: 'Your Email...',
    },
    {
      id: 'dob',
      label: 'DOB',
      inputType: 'date',
      buttonName: 'Next',
      placeholder: '',
    },
    {
      id: 'password',
      label: 'Password',
      inputType: 'password',
      buttonName: 'Submit',
      placeholder: '',
    },
  ];

  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    password: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (index === forms.length - 1) {
      setIsFormSubmitted(true);
    } else {
      setIndex((idx) => idx + 1);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setIndex((idx) => idx - 1);
  };

  const handleInputChange = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    const copyFormData = { ...formData };
    copyFormData[id] = val;
    setFormData(copyFormData);
  };

  return (
    <>
      <h1>Multi Step Form</h1>
      {!isFormSubmitted ? (
        <form className='container' onSubmit={handleSubmit}>
          {index > 0 && (
            <a href='/' onClick={handleBack}>
              Back
            </a>
          )}
          <label>{forms[index].label}</label>
          <input
            required
            value={formData[forms[index].id]}
            id={forms[index].id}
            onChange={handleInputChange}
            type={forms[index].inputType}
            placeholder={forms[index].placeholder}
          />
          <button>{forms[index].buttonName}</button>
        </form>
      ) : (
        <div>
          <h1>Success !</h1>
          <hr />
          <span>Name : {formData.name}</span>
          <br />
          <span>Email : {formData.email}</span>
          <br />
          <span>dob : {formData.dob}</span>
          <br />
          <span>password : {formData.password}</span>
        </div>
      )}
    </>
  );
};

export default MultiStepForm;
