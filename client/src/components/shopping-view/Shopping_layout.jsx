import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Shopping_layout() {
  return (
    <div className='flex flex-col overflow-hidden'>
      {/**/}
      <Header/>
      <main className='flex flex-col w-screen'>
        <Outlet/>
      </main>
    </div>   
  )
}
