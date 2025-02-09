import GoogleMapSection from "@/app/_components/GoogleMapSection";
import { Button } from "@/components/ui/button";
import {
  Bath,
  BedDouble,
  CarFront,
  Drill,
  Home,
  LandPlot,
  MapPin,
  Share,
} from "lucide-react";
import React from "react";
import AgentDetail from "./AgentDetail";



function Details({ listingDetail, imageList }) {
  const shareBtnHandler = async () => {
  }
  if(listingDetail){
    if(imageList){
      listingDetail.images=imageList.map(img=>img.url)
    }else{
      listingDetail.images=[]
    }
    
  }
  const coordinates = {
    lat: listingDetail?.coordinates?._lat,
    lng: listingDetail?.coordinates?._long,
  };
  return (
    listingDetail && (
      <div className="my-6 flex flex-col gap-4 sm:gap-2">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-2xl mb-2 sm:mb-1 text-[#7f57f1]">{listingDetail?.name}</h2>
            <h2 className="font-semibold text-3xl mb-2 font-sans sm:mb-1">${listingDetail?.price}</h2>
            <h2 className="text-gray-500 sm:text-base font-thin sm:font-light flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {listingDetail?.address}
            </h2>
          </div>
          <Button className="flex gap-2 bx-sd text-base" onClick={shareBtnHandler}>
            <Share />
            Share
          </Button>
        </div>
        <hr></hr>
        <div className="mt-4 flex flex-col gap-3">
          <h2 className="font-bold text-2xl">Key Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <h2 className="flex text-sm sm:text-base gap-2 items-center bg-purple-100 rounded-lg p-[12px] sm:p-[10px] text-primary justify-center">
              <Home  />
              {listingDetail?.propertyType}
            </h2>
            <h2 className="flex text-sm sm:text-base gap-2 items-center bg-purple-100 rounded-lg p-[12px] sm:p-[10px] text-primary justify-center">
              <Drill />
              Built In {listingDetail?.builtIn}
            </h2>
            <h2 className="flex text-sm sm:text-base gap-2 items-center bg-purple-100 rounded-lg p-[12px] sm:p-[10px] text-primary justify-center">
              <LandPlot />
              {listingDetail?.area}
            </h2>
            <h2 className="flex text-sm sm:text-base gap-2 items-center bg-purple-100 rounded-lg p-[12px] sm:p-[10px] text-primary justify-center">
              <BedDouble />
              {listingDetail?.bedroom} Bed
            </h2>
            <h2 className="flex text-sm sm:text-base gap-2 items-center bg-purple-100 rounded-lg p-[12px] sm:p-[10px] text-primary justify-center">
              <Bath />
              {listingDetail?.bathroom} Bath
            </h2>
            <h2 className="flex text-sm sm:text-base gap-2 items-center bg-purple-100 rounded-lg p-[12px] sm:p-[10px] text-primary justify-center">
              <CarFront />
              {listingDetail?.bathroom} Parking
            </h2>
          </div>
        </div>
        <div className="my-4">
          <h2 className="text-2xl font-bold">What's Special</h2>
          <p className="text-gray-600 mt-1 text-lg">{listingDetail?.description}</p>
        </div>
        <div>
          <h2 className="text-2xl mb-2 font-bold">Find On Map</h2>
          <GoogleMapSection
            coordinates={coordinates}
            listing={[listingDetail]}
            clicked={true}
            viewListing={true}
          />
        </div>
        <div>
        <h2 className="mt-2 text-2xl font-bold">Contact Agent</h2>
        <AgentDetail listingDetail={listingDetail} />
        </div>
      </div>
    )
  );
}

export default Details;
