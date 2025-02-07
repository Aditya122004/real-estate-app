import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function AgentDetail({listingDetail}) {
  return (
    <div className='flex gap-5 items-center justify-between p-5 rounded-lg border my-[14px] shadow-lg'>
      <div className='flex flex-col sm:flex-auto gap-2'>
        <div className='flex items-center gap-6 '>
          <Image src={listingDetail?.profileImage ? listingDetail?.profileImage : "/user-avatar.jpg"} alt='Profile Image' width={60} height={60} className='rounded-full'/>
          <div className='flex flex-col justify-between'>
          <h2 className='text-lg font-bold'>{listingDetail?.fullName}</h2>
          <h2 className='text-gray-500'>{listingDetail?.createdBy}</h2></div>
          </div>
        <Button className="bx-sd">Send Message</Button>
      </div>
    
    </div>
  )
}
