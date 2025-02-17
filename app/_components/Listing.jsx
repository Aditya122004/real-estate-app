"use client";
import { BathIcon, BedDouble, MapPin, Ruler, Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const GoogleAddressSearch = dynamic(() => import("./GoogleAddressSearch"), {
  ssr: false,
});
import { Button } from "@/components/ui/button";
import FilterSection from "./FilterSection";
import Link from "next/link";

function Listing({
  listing,
  handleSearchClick,
  searchedAddress,
  setCoordinates,
  clicked,
  setBedCount,
  setBathCount,
  setParkingCount,
  setPropertyType,
}) {
  // Initialize safeListing as state
  const [safeListing, setSafeListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [address, setAddress] = useState(null);

  setTimeout(() => {
    setLoading(false)
  }, 2000);

 useEffect(() => {
   const storeListingData = () => {
    //  setLoading(true); // indicate that we are loading
     if (listing && listing.length > 0) {
       setSafeListing(listing);
       setHasFetched(true);
      //  console.log(listing)
     } else {
       setSafeListing([]);
       setHasFetched(false);
     }
    //  setLoading(false);
     if (hasFetched) {
       setLoading(false)
     }
   }
    storeListingData();
 }, [listing, hasFetched]);


  return (
    <div className="w-full mt-[15px] sm:mt-0">
      <div className="flex items-center justify-between gap-[16px] sm:gap-6">
        <GoogleAddressSearch
          className="flex items-center justify-around"
          selectedAddress={(val) => {
            searchedAddress(val);
            setAdd(val);
          }}
          setCoordinates={setCoordinates}
        />
        <Button
          onClick={() => {
            handleSearchClick();
            setAddress(add);
          }}
          className="flex text-md gap-2 py-2 sm:py-4 sm:px-[35px] px-[32px] w-[40px] text-center bx-sd"
        >
          Search
        </Button>
      </div>

      <FilterSection
        setBedCount={setBedCount}
        setBathCount={setBathCount}
        setParkingCount={setParkingCount}
        setPropertyType={setPropertyType}
      />

      {clicked && address && (
        <div className="px-3 my-5">
          <h2 className="text-xl">
            Found <span className="font-bold">{safeListing?.length}</span> Result in{" "}
            <span className="font-bold text-primary">{address?.label}</span>
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {<>
          {loading ? ([1, 2, 3, 4, 5, 6, 7, 8]?.map((item, id) => (
                <div
                  key={id}
                  className="h-[230px] w-full bg-slate-200 animate-pulse rounded-lg"
                ></div>
          ))) :
            (safeListing.length > 0) ?
            // Once loaded and there are listings, map through them
              safeListing.map((item, index) => (
                <Link href={'/view-listing/' + item.id} key={index}>
                  <div className="p-3 bx-sd hover:border hover:border-primary cursor-pointer rounded-lg">
                    <Image
                      src={item?.images[0] || '/placeholder.svg'}
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
                    </div>
                  </div>
                </Link>
              )
            ) : (
              // If data has been fetched and there are no listings, show this message.
              !hasFetched && <h2 className="mt-4 text-xl">No Properties Found!</h2>
            )}</>}
      </div>
    </div>
  );
}

export default Listing;
