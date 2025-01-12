'use client'
import { MapPin } from 'lucide-react'
import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

function GoogleAddressSearch() {
  return (
    <div className='flex items-center w-full'>
    <MapPin className='h-10 w-10 p-2 rounded-full text-primary bg-purple-200'/>
    <GooglePlacesAutocomplete
    apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
    selectProps={{
        placeholder:'Search Property Adress',
        isClearable:true,
        className:'w-full'
      }}
    />
    </div>
  )
}

export default GoogleAddressSearch