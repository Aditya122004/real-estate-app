'use client'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Header() {
    const path=usePathname()
    const {user,isSignedIn}=useUser()
    return(
    <div className='p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white'>
        <div className='flex gap-12 items-center'>
        <Image src={'/logo.svg'} width={150} height={150} alt='Logo'/>
        <ul className='hidden md:flex gap-10'>
            <Link href={'/'}><li className={`hover:text-primary font-medium text-sm cursor-pointer ${path == '/' ? 'text-primary' : ''}`}>For Sale</li></Link>
            <Link href={'/rent'}><li className={`hover:text-primary font-medium text-sm cursor-pointer ${path == '/rent' ? 'text-primary' : ''}`}>For Rent</li></Link>
            <Link href={'/agent'}><li className={`hover:text-primary font-medium text-sm cursor-pointer ${path == '/agent' ? 'text-primary' : ''}`}>Agent Finder</li></Link>
        </ul>
        </div>
        <div className='flex gap-2 item-center'>
            <Link href={'/add-new-listing'}><Button className='flex gap-2'><Plus className='h-5 w-5'/>Post Your Ad</Button></Link>
            {isSignedIn?<UserButton/>:<Link href={'/sign-in'}><Button  variant='outline'>Login</Button></Link>}
            
        </div>
    </div>
  )
}

export default Header