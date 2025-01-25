
import { BathIcon, BedDouble, MapPin, Ruler } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
function Listing({listing=[]}) {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {listing.length>0?listing.map((item,index)=>(
          <div className='p-3 hover:border hover:border-primary cursor-pointer rounded-lg ' key={index} >
            <Image src={item.images[0]} width={800} height={150} className='rounded-lg object-cover h-[170px]' alt='Property Image'/>
            <div className='flex mt-2 gap-2 flex-col'>
              <h2 className='font-bold text-l'>${item?.price}</h2>
              <h2 className='flex gap-2 text-sm text-gray-400'><MapPin className='h-4 w-4'/>{item?.address.slice(0, 48)}...</h2>
              <div className='flex gap-2 mt-2 justify-between'>
                <h2 className='flex gap-2 text-sm w-full bg-slate-200 rounded-md p-2 item-centre text-gray-500 justify-center'>
                  <BedDouble className='h-4 w-4'/>{item?.bedroom}</h2>
                  <h2 className='flex gap-2 w-full text-sm bg-slate-200 rounded-md p-2 item-centre text-gray-500 justify-center'>
                  <BathIcon className='h-4 w-4'/>{item?.bathroom}</h2>
                  <h2 className='flex gap-2 w-full text-sm bg-slate-200 rounded-md p-2 item-centre text-gray-500 justify-center'>
                  <Ruler className='h-4 w-4'/>{item?.area}</h2>
              </div>
            </div>
          </div>
        )):[1,2,3,4,5,6,7,8].map((item,id)=>(
          <div key={id} className='h-[230px] w-full bg-slate-200 animate-pulse rounded-lg'>
          </div>
        )
        )}
      </div>
    </div>
  )
}

export default Listing