"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Formik } from "formik";
import { Button } from "@/components/ui/button";

function EditListing() {
  return (
    <div className="px-10 md:px-36 my-10">
      <h2 className="font-bold text-2xl">
        Enter some more details about your listing
      </h2>
      <Formik
        intialValues={{
          type: "",
          propertyType:''
        }}
        onSubmit={(values) => {}}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-5 rounded-lg shadow-md grid gap-7 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <h2 className=" text-slate-500">Rent or Sell?</h2>
                  <RadioGroup
                  onValueChange={(e)=>values.type=e}
                  defaultValue="Sell">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Rent" id="Rent" />
                      <Label htmlFor="Rent">Rent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sell" id="Sell" />
                      <Label htmlFor="Sell">Sell</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className=" text-slate-500">Property Type</h2>
                  <Select
                  onValueChange={(e)=>values.propertyType=e}
                  name="propertyType">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single Family House">
                        Single Family House
                      </SelectItem>
                      <SelectItem value="Town House">Town House</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Bedroom</h2>
                  <Input type="number" placeholder="2" name="bedroom" onChange={handleChange} />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">BathRoom</h2>
                  <Input type="number" placeholder="1" name="bathroom" onChange={handleChange}/>
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Built In</h2>
                  <Input type="number" placeholder="2000" name="builtIn" onChange={handleChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Parking</h2>
                  <Input type="number" placeholder="2" name="parking" onChange={handleChange}/>
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Lot Size (Sq.Ft)</h2>
                  <Input type="number" placeholder="1" name="lotSize" onChange={handleChange}/>
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Area (Sq.Ft)</h2>
                  <Input type="number" placeholder="2000" name="area" onChange={handleChange}/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Selling Price($)</h2>
                  <Input
                    type="number"
                    placeholder="5000000"
                    name="sellingPrice"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">HOA (Per Month) ($)</h2>
                  <Input type="number" placeholder="100" name="hoa" onChange={handleChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-10">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Description</h2>
                  <Textarea
                    placeholder="Enter Description"
                    name="description"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex gap-7 justify-end">
                <Button
                  variant="outline"
                  className="text-primary border-primary"
                >
                  Save
                </Button>
                <Button>Save & Publish</Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditListing;
