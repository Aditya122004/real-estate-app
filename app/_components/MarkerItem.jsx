import { MarkerF, OverlayView } from '@react-google-maps/api'
import React, { useState } from 'react'
import MarkerListingItem from './MarkerListingItem'

export default function MarkerItem({item}) {
    const coordinates={lat:item.coordinates._lat,lng:item.coordinates._long}
    const [selectedListing,setSelectedListing]=useState()
  return (
    <div><MarkerF position={coordinates} icon={{url:'/pin.svg',scaledSize:{width:40,height:40}}} onClick={()=>setSelectedListing(item)}>
        {selectedListing && <OverlayView position={selectedListing.coordinates} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <div><MarkerListingItem closeHandler={()=>setSelectedListing(null)} item={selectedListing}/></div>
            </OverlayView>}

        </MarkerF></div>
  )
}
