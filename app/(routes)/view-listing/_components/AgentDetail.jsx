import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Loader } from "lucide-react";
import { toast } from 'sonner';

export default function AgentDetail({ listingDetail }) {
  const { user } = useUser();
  const router = useRouter();
  const [loading , setLoading] = useState(false)
  
  const handleEnquiryEmailSending = async () => {
    setLoading(true)
      if (user) {
        const buyerEmail = user?.primaryEmailAddress.emailAddress;
        const agentEmail = listingDetail?.createdBy;
        const buyerName = user?.fullName;
        const propertyName = listingDetail?.name;

        // console.log(buyerEmail)
        // console.log(agentEmail)
        // console.log(buyerName)
        // console.log(propertyName)
        try {
          const response = await axios.post('/api/send-enquiry-mail', {
            buyerEmail,
            agentEmail,
            buyerName,
            propertyName,
          });

          if (response.status === 200) {
            setLoading(false)
            // Optionally, show a success notification to the user
            toast('Enquiry email sent successfully!', {
              description: "A mail has been sent to the agent about your enquiry.",
              action: {
                label: "Ok",
                onClick: () => console.log("Message Read"),
              },
            })
            // alert('Enquiry email sent successfully!')
            console.log('Enquiry email sent successfully:', response.data);
          } else {
            setLoading(false)
            toast('Failed to send enquiry email!')
            // alert('Failed to send enquiry email!')
            console.error('Failed to send enquiry email:', response.data);
          }
        } catch (error) {
          setLoading(false)
          console.error('Error sending enquiry email:', error.response?.data || error.message);
        }

      } else {
        setLoading(false)
        router.push("/sign-in")
      }
  }


  return (
    <div className='flex gap-5 items-center justify-between p-5 rounded-lg border my-[14px] shadow-lg w-full'>
      <div className='flex flex-col w-full sm:flex-auto gap-2'>
        <div className='flex items-center gap-6 '>
          <Image src={listingDetail?.profileImage ? listingDetail?.profileImage : "/user-avatar.jpg"} alt='Profile Image' width={60} height={60} className='rounded-full'/>
          <h2 className='text-lg font-bold'>{listingDetail?.fullName}</h2>
          <h2 className='text-gray-500 text-base'>{listingDetail?.createdBy}</h2></div>
          
        <Button onClick={handleEnquiryEmailSending} className="bx-sd w-full text-base">{loading ? <Loader/> : "Send Message"}</Button>
      </div>
    
    </div>
  )
}
