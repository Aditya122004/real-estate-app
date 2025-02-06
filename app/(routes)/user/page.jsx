"use client";
import { UserProfile } from "@clerk/nextjs";
import { Building2 } from "lucide-react";
import React from "react";
import UserListing from "./_components/UserListing";

export default function User() {
  return (
    <div className="my-6 md:px-10 lg:px-32 w-full">
      <h2 className="font-bold text-xl py-3">Profile</h2>
      <UserProfile routing="hash">
      <UserProfile.Page
          label='My Listing'
          labelIcon={<Building2 className='h-5 w-5'/>}
          url='my-listing'
        >
         <UserListing/>
        </UserProfile.Page>

      </UserProfile>
    </div>
  ); 
}