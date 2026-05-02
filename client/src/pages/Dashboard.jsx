import React from 'react'
import Sidebar from '../dashboard/Sidebar'
import Db from '../dashboard/Db'

const Dashboard = () => {
  return (
    <div className='flex '>
      <Sidebar/>
      <div className="w-full">
      <Db/>
      </div>
    </div>
  )
}

export default Dashboard
