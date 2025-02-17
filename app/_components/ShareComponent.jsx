import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Share } from 'lucide-react'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from "@/components/ui/input"
import { EmailShareButton , WhatsappShareButton , EmailIcon , WhatsappIcon } from 'next-share'
import { toast } from 'sonner'
import { DialogDescription } from '@radix-ui/react-dialog'

const ShareComponent = () => {
  const [link, setLink] = useState("");

  // Set link on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLink(window.location.href);
    }
  }, []);
    
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast("Link Copied To Clipboard!");
  };

  const handleInputChange = (e) => {
    setLink(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger 
        className="flex gap-2 bx-sd text-base p-3 bg-primary text-white rounded-lg items-center"
      >
        <Share className='h-5 w-5'/>
        Share
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Share With Friends</DialogTitle>
                  <DialogDescription className='text-sm text-gray-500 font-thin'>Copy Link To Clipboard Or Share On Available Social Media Apps</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col items-start w-full gap-2">
            <Label htmlFor="share-link" className="text-right text-lg font-semibold">
              Copy Link:
            </Label>
            <div className='w-full flex items-center justify-between gap-2'>
                <Input
                id="share-link"
                value={link}
                onChange={handleInputChange} // ✅ onChange handler
                className="w-[90%] font-bold"
                          />
                <Button className="text-base" onClick={copyToClipboard}>Copy</Button>       
            </div>          
            </div>
            <div className='w-full flex gap-2 p-2'>
                <EmailShareButton
                          url={link}
                          subject={'Check out this awesome property!'}
                          body={"I found this amazing listing. Check it out here:"}
                          separator={"\n"}
                      >
                        <div className="h-[60px] w-[60px] rounded-full object-cover p-2 bg-gray-200 flex items-center justify-center">
                            <EmailIcon size={40} round />
                        </div>
                      </EmailShareButton>  
                      <WhatsappShareButton
                          url={link}
                          title={'Check out this awesome property I found!'}
                          separator={"\n"}
                      >
                          <div className="h-[60px] w-[60px] object-cover rounded-full p-2 bg-gray-200 flex items-center justify-center">
                            <WhatsappIcon size={40} round />
                        </div>
                          
                </WhatsappShareButton>      
            </div>   
        </div>  
      </DialogContent>
    </Dialog>
  )
}

export default ShareComponent
