import React, { useEffect, useState } from 'react'
import { GoogleMap } from '@react-google-maps/api'
import MarkerItem from './MarkerItem'
import { usePathname } from 'next/navigation'

const containerStyle = {
    width: '100%',
    height: '80vh',
}

export default function GoogleMapSection({ coordinates, clicked, listing }) {
    const [viewListing, setViewListing] = useState(false)
    const path = usePathname()
    const splitPathName = path.split('/')

    const [center, setCenter] = useState({
        lat: -3.745,
        lng: -38.523
    })

    useEffect(() => {
        if (splitPathName[1] === 'view-listing') {
            setViewListing(true)
            if (coordinates) setCenter(coordinates)
        } else {
            setViewListing(false) 
        }
    }, [path, coordinates])

    useEffect(() => {
        if (coordinates && clicked && !viewListing) {
            setCenter(coordinates)
        }
    }, [coordinates, clicked, viewListing])

    const [map, setMap] = useState(null)

    const onLoad = React.useCallback((map) => {
        if (center) {
            const bounds = new window.google.maps.LatLngBounds()
            bounds.extend(center) 
            map.fitBounds(bounds)
        }
        setMap(map)
    }, [center]) 

    const onUnmount = React.useCallback(() => {
        setMap(null)
    }, [])

    return (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                { listing && listing.map((item, index) => (
                    <MarkerItem  key={index} item={item} />
                ))}
            </GoogleMap>
        </div>
    )
}
