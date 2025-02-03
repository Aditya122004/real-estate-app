import { Button } from '@/components/ui/button'
import { Image } from 'lucide-react'
import React from 'react'

export default function AgentDetail({listingDetail}) {
  return (
    <div className='flex gap-5 items-center justify-between p-5 rounded-lg shadow-md border my-6'>
    <div className='flex items-center gap-6'>
    <Image src={listingDetail?.profileImage} alt='Profile Image' width={60} height={60} className='rounded-full'/>
    <div><h2 className='text-lg font-bold'>{listingDetail?.fullName}</h2>
    <h2 className='text-gray-500'>{listingDetail?.createdBy}</h2></div>
    </div>
    <Button>Send Message</Button>
    </div>
  )
}
