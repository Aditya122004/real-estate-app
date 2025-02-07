'use client'
import { getImages, getListing } from '@/utils/FireBase'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Slider from '../_components/Slider'
import Details from '../_components/Details'

function ViewListing() {
    const params = useParams()
    const router = useRouter()
    const [listingdata, setListingData] = useState(null)  
    const [img, setImg] = useState([])

    useEffect(() => {
        const verifyRecord = async () => {
            try {
                const initialListing = await getListing(params.id);
                if (!initialListing) {
                    toast.error("Listing not found");
                    toast("Server Side Error");
                    return router.replace("/");
                }
                const imagesList = await getImages(params.id);
                    setListingData(initialListing);
                    setImg(imagesList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        verifyRecord()
    }, [params.id, router]); 
    return (
        <div className='px-4 md:px-32 lg:px-[180px] xl:px-56 py-5'>
            <Slider imageList={img} />
            <Details listingDetail={listingdata} imageList={img} />
        </div>
    );
}

export default ViewListing;
