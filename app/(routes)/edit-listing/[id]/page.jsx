"use client"
import React, { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Formik } from "formik"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"
import {
  getImages,
  getListing,
  publishListingFirebase,
  updateListing,
  uploadImageFirebase,
} from "@/utils/FireBase"
import FileUpload from "./_components/FileUpload"
import { ImageUpload } from "@/utils/Supabase"
import { Loader, LucideArrowDownWideNarrow } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function EditListing() {
  const params = useParams()
  const { user } = useUser()
  const router = useRouter()
  const [listing, setListing] = useState()
  const [images, setImages] = useState()
  const [loading, setLoading] = useState()
  const [img, setImg] = useState()
  useEffect(() => {
    user && verifyUserRecord()
  }, [user])
  const verifyUserRecord = async () => {
    const initialListing = await getListing(params.id)
    if (!initialListing) {
      toast.error("Listing not found")
      return router.replace("/")
    }
    if (initialListing.createdBy !== user?.primaryEmailAddress?.emailAddress) {
      toast.error("Unauthorized access")
      return router.replace("/")
    }
    const imagesList = await getImages(params.id)
    setListing(initialListing)
    setImg(imagesList)
  }
  const publishListing=async()=>{
    setLoading(true)
    try{
      await publishListingFirebase(params.id)
      toast("Listing Published Successfully")
      setLoading(false)
    }
    catch(error){
      toast("Error in publishing Listing")
      setLoading(false)
    }
    setLoading(false)
  }
  const onSubmitHandler = async (formValue) => {
    setLoading(true)
    try {
      const id = params.id
      await updateListing(
        id,
        formValue.type,
        formValue.propertyType,
        formValue.bedroom,
        formValue.bathroom,
        formValue.builtIn,
        formValue.parking,
        formValue.lotSize,
        formValue.area,
        formValue.price,
        formValue.hoa,
        formValue.description,
        formValue.profileImage,
        formValue.fullName
      )
      for (const image of images) {
        const file = image
        const fileName = Date.now().toString()
        const fileExt = file.type.split("/").pop()
        await ImageUpload(file, fileName, fileExt)
        const imgUrl = process.env.NEXT_PUBLIC_IMAGE_URL + fileName
        await uploadImageFirebase(id, imgUrl)
      }
      toast("Listing updated Successfully")
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast("Some Error occurred")
    }
    setLoading(false)
  }
  return (
    <div className="px-10 md:px-36 my-10">
      <h2 className="font-bold text-2xl">
        Enter some more details about your listing
      </h2>
      <Formik
        initialValues={{
          type: listing?.type || "Sell",
          propertyType: listing?.propertyType || "",
          profileImage: user?.imageUrl,
          fullName: user?.fullName,
        }}
        onSubmit={(values) => {
          onSubmitHandler(values)
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-5 rounded-lg shadow-md grid gap-7 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <h2 className=" text-slate-500">Rent or Sell?</h2>
                  <RadioGroup
                    onValueChange={(e) => (values.type = e)}
                    defaultValue={listing?.type || "Sell"}
                  >
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
                    onValueChange={(e) => (values.propertyType = e)}
                    name="propertyType"
                    defaultValue={listing?.propertyType}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder={
                          listing?.propertyType || "Select Property Type"
                        }
                      />
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
                  <Input
                    defaultValue={listing?.bedroom}
                    type="number"
                    placeholder="2"
                    name="bedroom"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">BathRoom</h2>
                  <Input
                    defaultValue={listing?.bathroom}
                    type="number"
                    placeholder="1"
                    name="bathroom"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Built In</h2>
                  <Input
                    defaultValue={listing?.builtIn}
                    type="number"
                    placeholder="2000"
                    name="builtIn"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Parking</h2>
                  <Input
                    defaultValue={listing?.parking}
                    type="number"
                    placeholder="2"
                    name="parking"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Lot Size (Sq.Ft)</h2>
                  <Input
                    defaultValue={listing?.lotSize}
                    type="number"
                    placeholder="1"
                    name="lotSize"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Area (Sq.Ft)</h2>
                  <Input
                    defaultValue={listing?.area}
                    type="number"
                    placeholder="2000"
                    name="area"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Selling Price($)</h2>
                  <Input
                    defaultValue={listing?.price}
                    type="number"
                    placeholder="5000000"
                    name="price"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">HOA (Per Month) ($)</h2>
                  <Input
                    defaultValue={listing?.hoa}
                    type="number"
                    placeholder="100"
                    name="hoa"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-10">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Description</h2>
                  <Textarea
                    defaultValue={listing?.description}
                    placeholder="Enter Description"
                    name="description"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <h2 className="font-lg text-gray-500 my-2">
                  Upload Property Images
                </h2>
                <FileUpload
                  setImages={(value) => {
                    setImages(value)
                  }}
                  img={img}
                />
              </div>
              <div className="flex gap-7 justify-end">
                <Button
                  disabled={loading}
                  variant="outline"
                  className="text-primary border-primary"
                >
                  {loading ? <Loader /> : "Save"}
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button type='button' disabled={loading}>
                      {loading ? <Loader /> : "Save & Publish"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Ready to Publish?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Do you really want to publish the listing?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={publishListing}>{loading?<Loader/>:'Publish'}</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default EditListing