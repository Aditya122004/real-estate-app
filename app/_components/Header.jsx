"use client";
import { Button } from "@/components/ui/button";
import { SignOutButton,  useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

function Header() {
  const path = usePathname();
  const { user, isSignedIn } = useUser();
  return (
    <div className="shadow-lg flex items-center justify-between sm:px-4 px-2 py-4 fixed top-0 w-full z-10 bg-white">
      <div className="flex gap-12 items-center">
        <Image src={"/logo.svg"} width={150} height={150} alt="Logo" />
        <ul className="hidden md:flex gap-10">
          <Link href={"/"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path == "/" ? "text-primary" : ""
              }`}
            >
              For Sell
            </li>
          </Link>
          <Link href={"/rent"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path == "/rent" ? "text-primary" : ""
              }`}
            >
              For Rent
            </li>
          </Link>
          <Link href={"/user/my-listing"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path == "/user/my-listing" ? "text-primary" : ""
              }`}
            >
              My Listing
            </li>
          </Link>
          
        </ul>
      </div>
      <div className="flex gap-2 item-center">
        <Link href={"/add-new-listing"}>
          <Button className="flex gap-2 bx-sd">
            <Plus className="h-5 w-5" />
            Post Your Ad
          </Button>
        </Link>
        {isSignedIn ? (
          
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Image
                src={user?.imageUrl}
                width={35}
                height={35}
                alt="Profile picture"
                className="rounded-full object-cover transition-transform hover:scale-105"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 space-y-1">
            <DropdownMenuLabel className="font-semibold text-gray-700">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
              <Link href="/user" className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
              <SignOutButton className="w-full text-left text-red-600 hover:text-red-700">
                Log Out
              </SignOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        ) : (
          <Link href={"/sign-in"}>
            <Button variant="outline">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
