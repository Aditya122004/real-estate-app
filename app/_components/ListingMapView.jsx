'use client'
import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import { getListingHome, searchListing } from '@/utils/FireBase'
import { toast } from 'sonner'

function ListingMapView({type}) {
    const [clicked,setClicked]=useState(false)
    const[searchedAddress,setSearchedAddress]=useState()
    const [listingData,setListingData]=useState()
    useEffect(()=>{getLatestListing()},[])
    const handleSearchClick=async()=>{
        try{ 
            setClicked(true)   
            const searchedTerm=searchedAddress?.value?.structured_formatting?.main_text
            const data=await searchListing(searchedTerm,type)
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
            setClicked(false)
            toast("Please Select An Address to Search")
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
        searchedAddress={(val)=>setSearchedAddress(val)} clicked={clicked}/></div>
        <div>Map</div>
    </div>
  )
}

export default ListingMapView