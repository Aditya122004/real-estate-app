'use client'
import { MapPin } from 'lucide-react'
import React from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

function GoogleAddressSearch({selectedAddress, setCoordinates}) {
  const handleChange = (place) => {
    if (place) {
      selectedAddress(place)
      geocodeByAddress(place.label)
        .then(result => getLatLng(result[0]))
        .then(({lat,lng}) => {
          setCoordinates({lat,lng})
        })
        .catch(error => {
          console.error('Error getting coordinates:', error);
          setCoordinates(null);
        });
    } else {
      selectedAddress(null);
      setCoordinates(null);
    }
  }

  return (
    <div className='flex items-center w-full'>
      <MapPin className='h-10 w-10 p-2 rounded-full mr-1 text-primary bg-purple-200'/>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          placeholder:'Search Property Address',
          isClearable:true,
          className:'w-full',
          onChange: handleChange
        }}
      />
    </div>
  )
}

export default GoogleAddressSearch