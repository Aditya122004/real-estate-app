"use client";
import { Button } from "@/components/ui/button";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Menu, Plus } from "lucide-react";
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
} from "@/components/ui/dropdown-menu";

function Header() {
  const path = usePathname();
  const { user, isSignedIn } = useUser();

  return (
    <div className="shadow-lg flex items-center justify-between sm:px-4 sm:py-3 px-2 py-4 fixed top-0 w-full z-10 bg-white">
      <div className="flex gap-12 items-center">
        <Link href={"/"}>
          <Image src={"/rsw-logo-4.svg"} width={150} height={150} alt="Logo" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex gap-10">
          <Link href={"/"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path == "/" ? "text-primary" : ""
              }`}
            >
              For Sale
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

      <div className="flex gap-2 items-center">
        <Link href={"/add-new-listing"}>
          <Button className="flex gap-2 bx-sd text-sm font-thin sm:text-base sm:font-normal px-2 py-1 sm:px-4 sm:py-2">
            <Plus className="h-3 w-3 sm:h-5 sm:w-5" />
            Post Your Ad
          </Button>
        </Link>

        {isSignedIn ? (
          <div className="flex items-center gap-2">
            {/* Account Menu */}
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

            {/* Mobile Menu (Only visible below `sm`) */}
            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Menu className="h-6 w-6" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 space-y-1">
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                    <Link href="/">For Sale</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                    <Link href="/rent">For Rent</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                    <Link href="/user/my-listing">My Listing</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
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