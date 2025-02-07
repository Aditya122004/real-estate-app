import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import PageLoader from "@/app/_components/PageLoader";

export default function Slider({ imageList }) {
  const [safeImageList, setSafeImageList] = useState([]);
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false)
  },2000)
  useEffect(() => {
    const storeImageList = () => {
      if (imageList && imageList.length > 0) {
        setSafeImageList(imageList)
      } else {
        setSafeImageList([])
      }
    } 
    storeImageList()
  },[imageList])
  // const safeImageList = imageList || [];
  return (
    <>
      {loading && <PageLoader/>}
    <div>
      {safeImageList.length > 0 ?
        <Carousel>
        <CarouselContent>
            {
              safeImageList.map((item, index) =>
              <CarouselItem key={index}>
                  <Image src={item.url != "" ? item.url : null} height={300} width={800}
                    alt="Property Image" className="rounded-xl object-cover h-[360px] w-full" />
            </CarouselItem>)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
        : <Image className="h-[360px] w-full object-cover rounded-xl" src="/no-pic-black-4.jpg" alt="no-image" height={300} width={800} />}
      </div>
      </>
  )
}
