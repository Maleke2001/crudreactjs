import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeListing = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const navigator = useNavigate();

  const removeDetail = async (id) => { // Accept id as a parameter
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const endpoint = `http://localhost:8000/employee/${id}`;

      try {
        const resp = await fetch(endpoint, {
          method: 'DELETE',
        });

        if (resp.ok) {
          console.log('Employee deleted successfully');
          // Update state to remove the deleted employee
          setEmployeeData((prevData) => prevData.filter((item) => item.id !== id));
        } else {
          console.error('Failed to delete the employee');
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const LoadDetail = (id) => {
    navigator(`/details/${id}`); // Use template literals correctly
  };

  const EditDetail = (id) => {
    navigator(`/edit/${id}`); // Use template literals correctly
  };

  useEffect(() => {
    fetch('http://localhost:8000/employee')
      .then((response) => response.json())
      .then((data) => {
        setEmployeeData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="flex justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-7xl">
        <div className="bg-blue-600 text-white p-4 rounded-t-lg">
          <h1 className="flex justify-center text-xl font-semibold">Employee Listing</h1>
          <div className="bg-black text-white py-2 w-[10rem] px-1 rounded">
            <Link to="/create"> Add new (+)</Link>
          </div>
        </div>

        <div className="p-4">
          <table className="min-w-full bg-white border border-gray-200 w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Id</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {employeeData && employeeData.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.email}</td>
                  <td className="py-2 px-4 border-b">{item.phone}</td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button 
                      onClick={() => EditDetail(item.id)} // Call EditDetail correctly
                      className="bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => removeDetail(item.id)} // Call removeDetail with id
                      className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <button 
                      onClick={() => LoadDetail(item.id)} 
                      className="bg-green-600 text-white py-1 px-2 rounded hover:bg-green-700"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeListing;




      //   method: 'DELETE',
      // })
      //   .then((response) => {
      //     if (response.ok) {
      //       setEmployeeData((prevData) => prevData.filter((item) => item.id !== id));
      //       alert('Employee deleted successfully.');
      //     } else {
      //       alert('Failed to delete employee.');
      //     }
      //   })
      //   .catch((error) => console.error('Error deleting employee:', error));
  //   }
  // };