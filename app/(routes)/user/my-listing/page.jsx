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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


export default function MyListing() {
  const {user}=useUser()
  const [listingData, setListingData] = useState()
  const itemsPerPage = 24;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
        user&&getUserListing()
  }, [user])
  
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
            try{
              await Promise.all(images.map((item,key)=>{
                const fileName=item.split('/')
                return deleteImages(fileName[fileName.length-1])
              }))
              await deleteImagesFirebase(id)
              await deleteListing(id)
              setListingData(listingData.filter((listing)=>listing.id!==id))
              toast('Listing Deleted Successfully')
            }
            catch(error){
              toast('Error in Deleting Listing')
            }
  }
  
  const totalPages = Math.ceil(listingData?.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedListings = listingData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div>
      <h2 className="font-bold text-2xl ms-2 mt-[120px] sm:mt-[100px]">Manage Your Listings</h2>
      {/* grid grid-cols-1 md:grid-cols-2 gap-3 */}
      <div className="flex flex-wrap p-3 justify-center lg:py-2 lg:px-[30px] lg:justify-normal lg:gap-[30px] lg:mb-0 xl:gap-[14px] xl:px-[20px] xl:py-4">
        {paginatedListings &&
          paginatedListings.map((item, index) => (
            <div
              className="bx-sd my-4 w-[370px] lg:w-[450px] h-auto xl:w-[390px] p-3 hover:border hover:border-primary cursor-pointer rounded-lg "
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
              <div className="flex mt-2 gap-[6px] flex-col">
                <h2 className="font-semibold text-xl text-[#7f57f1]">{item?.name}</h2>
                {item?.type === "Rent" ?
                  <h2 className="font-semibold text-lg font-sans">${item?.price} / month</h2> :
                  <h2 className="font-semibold text-lg font-sans">${item?.price}</h2>
                }
                <h2 className="flex gap-2 text-base items-center text-gray-400">
                  <MapPin className="h-[14px] w-[14px]" />
                  {item?.address.length > 50
                    ? `${item.address.slice(
                        0,
                        item.address.lastIndexOf(" ", 47)
                      )}...`
                    : item.address}
                </h2>
                <div className="flex gap-2 mt-2 justify-between">
                  <h2 className="flex font-sans gap-2 text-sm w-full bg-slate-200 rounded-md p-2 items-center text-gray-500 justify-center">
                    <BedDouble className="h-4 w-4" />
                    {item?.bedroom}
                  </h2>
                  <h2 className="flex font-sans gap-2 w-full text-sm bg-slate-200 rounded-md p-2 item-centre text-gray-500 justify-center">
                    <BathIcon className="h-4 w-4" />
                    {item?.bathroom}
                  </h2>
                  <h2 className="flex font-sans gap-2 w-full text-sm bg-slate-200 rounded-md p-2 item-centre text-gray-500 justify-center">
                    <Ruler className="h-4 w-4" />
                    {item?.area}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <Link href={"/view-listing/" + item.id} className="w-full">
                    <Button size="sm" className="w-full text-base" variant="outline">
                      View
                    </Button>
                  </Link>
                  <Link href={"/edit-listing/" + item.id} className="w-full">
                    <Button size="sm" className="bx-sd w-full text-base">
                      Edit
                    </Button>
                  </Link>
                  <DeleteDialog
                    item={item}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            </div>
          ))}
        {/* Pagination Component */}
      {totalPages >= 1 && (
        <Pagination className="mt-6 w-full text-lg">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                className="text-lg"
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                  className="text-lg"
                >
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 3 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                className="text-lg"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      </div>
    </div>
  );
}
