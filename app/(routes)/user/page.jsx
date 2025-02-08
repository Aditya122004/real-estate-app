"use client";
import { UserProfile } from "@clerk/nextjs";
import React, { useEffect } from "react";

export default function User() {
  return (
    <div className="my-6 md:px-10 lg:px-32 w-full">
      <h2 className="font-bold text-xl py-3">Profile</h2>
      <UserProfile routing="hash"></UserProfile>
    </div>
  );
}
