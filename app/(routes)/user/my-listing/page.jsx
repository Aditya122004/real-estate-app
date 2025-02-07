'use client'
import { Button } from '@/components/ui/button';
import { deleteImagesFirebase, deleteListing, getUserListings } from '@/utils/FireBase';
import { useUser } from '@clerk/nextjs'
import { BathIcon, BedDouble, MapPin, Ruler } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import DeleteDialog from './_components/DeleteDialog';
import { deleteImages } from '@/utils/Supabase';
import { toast } from 'sonner';


export default function MyListing() {
    const {user}=useUser()
        const[listingData,setListingData]=useState()
        const [loading, setLoading] = useState(false)
        useEffect(()=>{
            user&&getUserListing()
        },[user])
        const getUserListing=async()=>{
            try {
                const data = await getUserListings(user?.primaryEmailAddress.emailAddress);
                const resultArray = [];
                const arr = [];
                for (let key in data) {
                  resultArray.push({
                    key: key,
                    value: data[key],
                  });
                }
                resultArray.map((key, value) => {
                  arr.push(key.value);
                });
                setListingData(arr);
              } catch (error) {
                console.log(error);
                toast("Error in fetching listings");
              }
    
        }
        const handleDelete=async(id,images)=>{
          setLoading(true)
            try{
              await Promise.all(images.map((item,key)=>{
                const fileName=item.split('/')
                return deleteImages(fileName[fileName.length-1])
              }))
              await deleteImagesFirebase(id)
              await deleteListing(id)
              setLoading(false)
              setListingData(listingData.filter((listing)=>listing.id!==id))
              toast('Listing Deleted Successfully')
            }
            catch(error){
              setLoading(false)
              toast('Error in Deleting Listing')
            }
            setLoading(false)
        }
  return (
    <div>
      <h2 className="font-bold text-2xl">Manage Your Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {listingData &&
          listingData.map((item, index) => (
            <div
              className="p-3 hover:border hover:border-primary cursor-pointer rounded-lg "
              key={index}
            >
              <h2 className="bg-primary text-white absolute px-2 text-sm p-1 m-1 rounded-lg">
                {item.active ? "Published" : "Draft"}
              </h2>
              <Image
                src={item?.images[0] ? item?.images[0] : "/placeholder.svg"}
                width={800}
                height={150}
                className="rounded-lg object-cover h-[170px]"
                alt="Property Image"
              />
              <div className="flex mt-2 gap-2 flex-col">
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
                  <h2 className="flex gap-2 w-full text-sm bg-slate-200 rounded-md p-2 item-centre text-gray-500 justify-center">
                    <Ruler className="h-4 w-4" />
                    {item?.area}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <Link href={"/view-listing/" + item.id} className="w-full">
                    <Button size="sm" className="w-full" variant="outline">
                      View
                    </Button>
                  </Link>
                  <Link href={"/edit-listing/" + item.id} className="w-full">
                    <Button size="sm" className="w-full">
                      Edit
                    </Button>
                  </Link>
                  <DeleteDialog
                    item={item}
                    onDelete={handleDelete}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
