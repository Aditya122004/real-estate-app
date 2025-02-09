"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { getListingHome, searchListing } from "@/utils/FireBase";
import { toast } from "sonner";
import GoogleMapSection from "./GoogleMapSection";
import { useUser } from "@clerk/nextjs";

function ListingMapView({ type }) {
  const {user}=useUser()
  const [clicked, setClicked] = useState(false);
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [propertyType, setPropertyType] = useState(null);
  const [searchedAddress, setSearchedAddress] = useState();
  const [listingData, setListingData] = useState();
  const [coordinates, setCoordinates] = useState();
  useEffect(() => {
    getLatestListing();
  }, [user]);
  const handleSearchClick = async () => {
    try {
      setClicked(true);
      const searchedTerm =
        searchedAddress?.value?.structured_formatting?.main_text;
      if (!searchedTerm) {
        toast("Please Select An Address to Search");
        return;
      }
      const data = await searchListing(
        searchedTerm,
        type,
        Number(bedCount),
        Number(bathCount),
        Number(parkingCount),
        propertyType
      );
      if (!data) {
        toast("No results found");
      }
      if (data) {
        const filteredData = user 
          ? data.filter(item => item.createdBy !== user.primaryEmailAddress.emailAddress)
          : data;
          setListingData(filteredData);
      }else{
        setListingData(data)
      }
      
    } catch (error) {
      setClicked(false);
      console.error("Search error:", error);
      toast("An error occurred while searching");
    }
  };
  const getLatestListing = async () => {
    try {
      const data = await getListingHome(type);
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
      if (arr) {
        const filteredData = user 
          ? data.filter(item => item.createdBy !== user.primaryEmailAddress.emailAddress)
          : data;
          setListingData(filteredData);
      }else{
        setListingData(arr)
      }
    } catch (error) {
      console.log(error);
      toast("Error in fetching listings");
    }
  };
  return (
    <div className="flex w-full">
      <div className="flex justify-evenly p-1 sm:p-4 sm:w-[50%] lg:w-[60%] xl:w-auto"> 
        <Listing
          listing={listingData}
          handleSearchClick={handleSearchClick}
          searchedAddress={(val) => setSearchedAddress(val)}
          clicked={clicked}
          setBedCount={setBedCount}
          setBathCount={setBathCount}
          setParkingCount={setParkingCount}
          setPropertyType={setPropertyType}
          setCoordinates={setCoordinates}
        />
      </div>
      <div className="p-4 h-full sm:w-[50%] lg:w-[40%] xl:w-[70%]">
        <GoogleMapSection
          coordinates={coordinates}
          clicked={clicked}
          listing={listingData}
        />
      </div>
    </div>
  );
}

export default ListingMapView;
