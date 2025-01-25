'use client'
import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import { getListingHome } from '@/utils/FireBase'
import { toast } from 'sonner'

function ListingMapView({type}) {
    const [listingData,setListingData]=useState()
    useEffect(()=>{getLatestListing()},[])
    const getLatestListing=async()=>{
        try{
            const data=await getListingHome(type)
            setListingData(data)
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
        <div><Listing listing={listingData}/></div>
        <div>Map</div>
    </div>
  )
}

export default ListingMapView