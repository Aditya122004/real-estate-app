import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AgentDetail({ listingDetail }) {
  const { user } = useUser();
  const router = useRouter();
  
  const handleEnquiryEmailSending = async () => {
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
            alert('Enquiry email sent successfully!')
            console.log('Enquiry email sent successfully:', response.data);
            // Optionally, show a success notification to the user
          } else {
            alert('Failed to send enquiry email!')
            console.error('Failed to send enquiry email:', response.data);
          }
        } catch (error) {
          console.error('Error sending enquiry email:', error.response?.data || error.message);
        }

      } else {
        router.push("/sign-in")
      }
  }


  return (
    <div className='flex gap-5 items-center justify-between p-5 rounded-lg border my-[14px] shadow-lg w-full'>
      <div className='flex flex-col w-full sm:flex-auto gap-2'>
        <div className='flex items-center gap-6 '>
          <Image src={listingDetail?.profileImage ? listingDetail?.profileImage : "/user-avatar.jpg"} alt='Profile Image' width={60} height={60} className='rounded-full'/>
          <h2 className='text-lg font-bold'>{listingDetail?.fullName}</h2>
          <h2 className='text-gray-500'>{listingDetail?.createdBy}</h2></div>
          
        <Button onClick={handleEnquiryEmailSending} className="bx-sd w-full">Send Message</Button>
      </div>
    
    </div>
  )
}
