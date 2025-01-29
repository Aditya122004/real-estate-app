import React, { useEffect,useState } from 'react'
import { GoogleMap} from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '80vh',
  }
  

export default function GoogleMapSection({coordinates,clicked}) {
    const [center,setCenter]=useState({
        lat: -3.745,
    lng: -38.523
    })
    useEffect(() => {
        if (coordinates && clicked) {
            setCenter(coordinates)
        }
    }, [coordinates, clicked])
      const [map, setMap] = React.useState(null)
    
      const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)
    
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
  return (
    <div> <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={12}
    onLoad={onLoad}
    onUnmount={onUnmount}
  >
    {/* Child components, such as markers, info windows, etc. */}
    <></>
  </GoogleMap></div>
  )
}
