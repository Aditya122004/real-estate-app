'use client'
import GoogleAddressSearch from '@/app/_components/GoogleAddressSearch'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { addListing } from '@/utils/FireBase'
import { useUser } from '@clerk/nextjs'
import { toast } from "sonner"


function AddNewListing() {
  const [selectedAddress,setSelectedAddress]=useState()
  const [coordinates,setCoordinates]=useState()
  const {user}=useUser()
  const nextHandler=async()=>{
    try{
      console.log(selectedAddress.label,coordinates,user?.primaryEmailAddress.emailAddress)
      await addListing(selectedAddress.label,coordinates,user?.primaryEmailAddress.emailAddress)
      
      console.log("Lising added successfully")
      toast("New Address added for Listing")
    }catch{
      toast("Eror in adding Listing")
    }
  }
  return (
    <div className='mt-10 md:mx-56 lg:mx-80'>
    <div className='p-10 flex flex-col gap-5 items-center justify-center'>
    <h2 className='font-bold text-2xl'>AddNewListing</h2>
    <div className='p-10 px-28 w-full rounded-lg border shadow-md flex flex-col gap-5'>
        <h2 className='text-gray-500'>Enter Addres which you want to list</h2>
        <GoogleAddressSearch
        selectedAddress={(value)=>setSelectedAddress(value)}
        setCoordinates={(value)=>setCoordinates(value)}/>
        <Button
        disabled={!selectedAddress || !coordinates}
        onClick={nextHandler}>Next</Button>
    </div>
    </div>
    </div>
  )
}

export default AddNewListing