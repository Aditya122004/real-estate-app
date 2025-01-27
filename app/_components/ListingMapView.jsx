'use client'
import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import { getListingHome, searchListing } from '@/utils/FireBase'
import { toast } from 'sonner'

function ListingMapView({type}) {
    const [clicked,setClicked]=useState(false)
    const [bedCount,setBedCount]=useState(0)
    const [bathCount,setBathCount]=useState(0)
    const [parkingCount,setParkingCount]=useState(0)
    const [propertyType,setPropertyType]=useState(null)
    const[searchedAddress,setSearchedAddress]=useState()
    const [listingData,setListingData]=useState()
    useEffect(()=>{getLatestListing()},[])
    const handleSearchClick=async()=>{
        try { 
            setClicked(true)
            const searchedTerm = searchedAddress?.value?.structured_formatting?.main_text
            if (!searchedTerm) {
                toast("Please Select An Address to Search")
                return
            }
            const data = await searchListing(searchedTerm, type, Number(bedCount), Number(bathCount), Number(parkingCount), propertyType)
            if (!data) {
                toast("No results found")
            }
            setListingData(data)
        } catch(error) {
            setClicked(false)
            console.error("Search error:", error) 
            toast("An error occurred while searching")
        }
    }
    const getLatestListing=async()=>{
        try{
            const data=await getListingHome(type)
            const resultArray = []
            const arr=[]
            for (let key in data) {
                resultArray.push({
                    key: key,
                    value: data[key]
                })
            }
            resultArray.map((key,value)=>{
                arr.push(key.value)
            })
           setListingData(arr)
        }
        catch(error){
            console.log(error)
            toast("Error in fetching listings")
        }
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
        <div><Listing listing={listingData} handleSearchClick={handleSearchClick}
        searchedAddress={(val)=>setSearchedAddress(val)} 
        clicked={clicked}
        setBedCount={setBedCount}
        setBathCount={setBathCount}
        setParkingCount={setParkingCount}
        setPropertyType={setPropertyType}/></div>
        <div>Map</div>
    </div>
  )
}

export default ListingMapView