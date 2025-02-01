import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function Slider({ imageList }) {
  const safeImageList = imageList || [];
  return (
    <div>
      {safeImageList.length>0?<Carousel>
        <CarouselContent>
            {safeImageList.map((item,index)=><CarouselItem key={index}><Image src={item.url} height={300} width={800}
            alt="Property Image" className="rounded-xl object-cover h-[360px] w-full"/></CarouselItem>)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>:<div className="w-full h-[200px] bg-slate-200 animate-pulse rounded "></div>}
    </div>
  )
}
