import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex items-center justify-center w-full mt-[170px] mb-[50px] text-lg'>
      <SignUp />
    </div>
  )
  
}