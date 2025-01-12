import GoogleAddressSearch from '@/app/_components/GoogleAddressSearch'
import { Button } from '@/components/ui/button'
import React from 'react'


function AddNewListing() {
  return (
    <div className='mt-10 md:mx-56 lg:mx-80'>
    <div className='p-10 flex flex-col gap-5 items-center justify-center'>
    <h2 className='font-bold text-2xl'>AddNewListing</h2>
    <div className='p-10 px-28 w-full rounded-lg border shadow-md flex flex-col gap-5'>
        <h2 className='text-gray-500'>Enter Addres which you want to list</h2>
        <GoogleAddressSearch/>
        <Button>Next</Button>
    </div>
    </div>
    </div>
  )
}

export default AddNewListing