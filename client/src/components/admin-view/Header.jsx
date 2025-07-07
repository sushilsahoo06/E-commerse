import React from 'react'
import { Button } from '../ui/button'
import { LogOut, SquareMenu } from 'lucide-react'


export default function Header() {
  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background'>
      <Button className='lg:hidden sm:block'>
        <SquareMenu/>
        <span className='sr-only'>Toggle menu</span>
      </Button>
      <div>
        <Button className='flex flex-1 justify-end'>
          <LogOut/>
          Logout
        </Button>
      </div>

    </header>

  )
}


