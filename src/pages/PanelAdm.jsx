import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Add from './Add'
import List from './List'
import OrdersAdm from './OrdersAdm'
import Sidebar from '../components/Sidebar'
import Login from './Login'


const PanelAdm = () => {
    const [token, setToken] =useState ('sacaresto');

    return (
      <div className='bg-gray-50 min-h-screen'>
        { token === ''
          ? <Login />
          : <>
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/add' element={<Add/>} />
                  <Route path='/list' element={<List/>} />
                  <Route path='/ordersAd' element={<OrdersAdm/>} />
                </Routes>
              </div>
            </div>
          </>
        }
  
      </div>
    )
}

export default PanelAdm
