import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EmpEdit = () => {
  const [employee, setEmployee] = useState({ id: '', name: '', email: '', phone: '' });
  const navigate = useNavigate();
  const { id } = useParams(); // Get employee ID from URL parameters

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8000/employees/${id}`);
        if (response.ok) {
          const data = await response.json();
        setEmployee(data);
        }
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const empData = { id: employee.id, name: employee.name, email: employee.email, phone: employee.phone };
    
    try {
      const response = await fetch(`http://localhost:8000/employee/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empData),
      });

      if (response.ok) {
              console.log('Employee updated successfully');
      navigate('/'); 
      } else{
        console.log('employeer is not updated')
      }


    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <div className="flex justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-center text-xl font-semibold">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="id" className="block text-gray-700">ID</label>
            <input
              type="text"
              name="id"
              value={employee.id}
              readOnly // ID should not be editable
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={employee.phone}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmpEdit;
