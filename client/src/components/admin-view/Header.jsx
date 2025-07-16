import React from 'react'
import { Button } from '../ui/button'
import { LogOut, SquareMenu } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logOutUser } from '@/store/auth-slice'


export default function Header({setOpen}) {
  const dispatch=useDispatch()
  function handleLogout(){
    dispatch(logOutUser())
  }

  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background'>
      <Button onClick={()=>setOpen(true)} className='lg:hidden sm:block'>
        <SquareMenu/>
        <span className='sr-only'>Toggle menu</span>
      </Button>
      <div className='flex flex-1 justify-end'>
        <Button onClick={handleLogout} className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow'>
          <LogOut/>
          Logout
        </Button>
      </div>
    </header>
  )
}


