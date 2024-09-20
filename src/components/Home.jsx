import React from 'react'
import EmployeeListing from './EmplyeeListing'

const Home = () => {
  return (
    <div className='App'>
         <h1 className='flex justify-center mt-[100px] font-bold text-3xl'>React JS CRUD operations</h1>
         <EmployeeListing/>

    </div>
  )
}

export default Home