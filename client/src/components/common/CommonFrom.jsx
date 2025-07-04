import React from 'react'

export default function CommonFrom({fromControls}) {
  return (
    <form>
      <div className='flex flex-col gap-3'>
          {
            fromControls.map(cont)
          }
      </div>

    </form>
  )
}
