import { Button } from '@/components/ui/button'
import React, { Fragment } from 'react'

export default function Products() {
  return (
    <Fragment>
      <div className='mb-5 flex w-full justify-end'>
        <Button>Add new product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>

      </div>
    </Fragment>
  )
}
