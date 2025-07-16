import React from 'react'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  return (
    <header className='sticky top-0 w-full border-b bg-background z-0'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to='/shop/home' className='flex items-center gap-2'>
          <FontAwesomeIcon icon={faHouseUser} className='h-7 w-7'/>
          <span className='font-bold'>Ecommerse</span>
        </Link>
        
      </div>
    </header>
  )
}
