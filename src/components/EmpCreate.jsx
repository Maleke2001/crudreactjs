import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmpCreate = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(""); 
  const navigator = useNavigate(); // Move this here


  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    if (value.length < 5) {
      setMessage('Name input is too short.');
    } else {
      setMessage('Looks good!');
    }
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const empData ={ id, name, email, phone }
    
    fetch('http://localhost:8000/employee', {
      method: 'POST',
      headers: {"content-type": "application/json"},
      body: JSON.stringify(empData)
    })
    .then(resp => {
      alert('Successfully saved.')
      navigator('/');
    })
    .catch(err => console.error('That data doesn\'t exist', err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-slate-400 h-screen flex items-center pt-[15rem] flex-col rounded px-8 pb-8 mb-4">
        <div>
          <h1 className='text-3xl mb-12'>Enter The Employer Details</h1>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
            ID
          </label>
          <input
            type="text"
            name="id"
            id="id"
            value={id}
            onChange={handleIdChange}
            className="shadow appearance-none border rounded w-[45rem] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="shadow appearance-none border rounded w-[45rem] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <p>{message}</p> {/* Display the message */}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="shadow appearance-none border rounded w-[45rem] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            className="shadow appearance-none border rounded w-[45rem] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
          <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EmpCreate;
