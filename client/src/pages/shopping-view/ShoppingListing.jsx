import Filter from '@/components/shopping-view/Filter'
import React from 'react'

export default function ShoppingListing() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6'>
      <Filter/>
    </div>
  )
}
