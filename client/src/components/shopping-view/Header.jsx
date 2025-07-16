
import React from 'react'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { Sheet,SheetContent,SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
// import Variants from '../../motion/Variants'
export default function Header() {
  
  return (
    <header className='sticky top-0 w-full border-b bg-background z-0'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to='/shop/home' className='flex items-center gap-2'>
          <FontAwesomeIcon icon={faHouseUser} className='h-7 w-7'/>
          <span className='font-bold'>Ecommerse</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button className='lg:hidden' variant='outline' size='icon'>
              <Menu className='h-6 w-6'/>
              <span className='sr-only'>Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-full max-w-xs'>

          </SheetContent>
        </Sheet>
        <div className='hidden lg:block'>

        </div>
      </div>
    </header>
  )
}
