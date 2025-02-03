import { Button } from '@/components/ui/button'
import { BathIcon, BedDouble,  MapPin , X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function MarkerListingItem({item,closeHandler}) {
  return (
    <div>
        <div className=" cursor-pointer rounded-lg  w-[180px]">
            <X onClick={closeHandler}/>
    <Image
      src={item?.images[0]}
      width={800}
      height={150}
      className="rounded-lg object-cover h-[120px] w-[180px]"
      alt="Property Image"
    />
    <div className="bg-white flex mt-2 gap-2 p-2 flex-col">
      <h2 className="font-bold text-l">${item?.price}</h2>
      <h2 className="flex gap-2 text-sm text-gray-400">
        <MapPin className="h-4 w-4" />
        {item?.address.length > 50
          ? `${item.address.slice(
              0,
              item.address.lastIndexOf(" ", 47)
            )}...`
          : item.address}
      </h2>
      <div className="flex gap-2 mt-2 justify-between">
        <h2 className="flex gap-2 text-sm w-full bg-slate-200 rounded-md p-2 item-centre text-gray-500 justify-center">
          <BedDouble className="h-4 w-4" />
          {item?.bedroom}
        </h2>
        <h2 className="flex gap-2 w-full text-sm bg-slate-200 rounded-md p-2 item-centre text-gray-500 justify-center">
          <BathIcon className="h-4 w-4" />
          {item?.bathroom}
        </h2>
      </div>
      <Link href={`/view-listing/${item.id}`}><Button size="sm" className='w-full'>View Detail </Button></Link>
    </div>
  </div></div>
  )
}
