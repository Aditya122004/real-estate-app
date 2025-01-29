"use client";
import { BathIcon, BedDouble, MapPin, Ruler, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const GoogleAddressSearch = dynamic(() => import("./GoogleAddressSearch"), {
  ssr: false,
});
import { Button } from "@/components/ui/button";
import FilterSection from "./FilterSection";
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
  const searchBtnHandler = handleSearchClick;
  const [add,setAdd]=useState()
  const safeListing = listing || [];
  const [address, setAddress] = useState();
  return (
    <div>
      <div className="p-3 flex gap-6">
      <GoogleAddressSearch
     selectedAddress={(val)=>{searchedAddress(val) 
     setAdd(val)}}
     setCoordinates={setCoordinates}/>
        <Button
          onClick={() => {
            searchBtnHandler()
            setAddress(add)
          }}
          className="flex gap-2"
        >
          <Search className="h-4 w-4" />
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
            Found <span className="font-bold">{safeListing?.length}</span>{" "}
            Result in{" "}
            <span className="font-bold text-primary">{address?.label}</span>
          </h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {safeListing.length > 0
          ? safeListing.map((item, index) => (
              <div
                className="p-3 hover:border hover:border-primary cursor-pointer rounded-lg "
                key={index}
              >
                <Image
                  src={item.images[0]}
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
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item, id) => (
              <div
                key={id}
                className="h-[230px] w-full bg-slate-200 animate-pulse rounded-lg"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default Listing;
