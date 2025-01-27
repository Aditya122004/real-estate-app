import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BathIcon, BedDouble, CarFront } from 'lucide-react'


function FilterSection({setBedCount,setBathCount,setParkingCount,setPropertyType}) {
  return (
    <div className='px-3 py-2 grid grid-cols-2 md:flex gap-2'>
      <Select onValueChange={setBedCount}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Bed" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="1"><h2 className='flex gap-2'><BedDouble className='h-5 w-5 text-primary'/>1+</h2></SelectItem>
      <SelectItem value="2"><h2 className='flex gap-2'><BedDouble className='h-5 w-5 text-primary'/>2+</h2></SelectItem>
      <SelectItem value="3"><h2 className='flex gap-2'><BedDouble className='h-5 w-5 text-primary'/>3+</h2></SelectItem>
    </SelectContent>
  </Select>
  <Select onValueChange={setBathCount}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Bath" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="1"><h2 className='flex gap-2'><BathIcon className='h-5 w-5 text-primary'/>1+</h2></SelectItem>
      <SelectItem value="2"><h2 className='flex gap-2'><BathIcon className='h-5 w-5 text-primary'/>2+</h2></SelectItem>
      <SelectItem value="3"><h2 className='flex gap-2'><BathIcon className='h-5 w-5 text-primary'/>3+</h2></SelectItem>
    </SelectContent>
  </Select>
  <Select onValueChange={setParkingCount}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Parking" />
    </SelectTrigger>
    <SelectContent>
    <SelectItem value="1"><h2 className='flex gap-2'><CarFront className='h-5 w-5 text-primary'/>1+</h2></SelectItem>
      <SelectItem value="2"><h2 className='flex gap-2'><CarFront className='h-5 w-5 text-primary'/>2+</h2></SelectItem>
      <SelectItem value="3"><h2 className='flex gap-2'><CarFront className='h-5 w-5 text-primary'/>3+</h2></SelectItem>
    </SelectContent>
  </Select>
  <Select onValueChange={(val)=>val=='Any'?setPropertyType(null):setPropertyType(val)}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Home Type" />
    </SelectTrigger>
    <SelectContent>
    <SelectItem value="Any">Any</SelectItem>
      <SelectItem value="Single Family House">Single Family House</SelectItem>
      <SelectItem value="Town House">Town House</SelectItem>
      <SelectItem value="Condo">Condo</SelectItem>
      
    </SelectContent>
  </Select>
  </div>
  )
}

export default FilterSection