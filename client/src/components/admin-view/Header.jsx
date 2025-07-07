import React from 'react'
import { Button } from '../ui/button'
import { SquareMenu } from 'lucide-react'

export default function Header() {
  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background'>
      <Button className={'lg:hidden sm:block'}>
        <SquareMenu />
      </Button>
    </header>
  )
}
