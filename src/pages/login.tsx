import { NavigationHeaderButtons } from '@/components/NavigationHeaderButtons'
import { Button } from '@/components/ui/button';
import Image from 'next/image'

export default function Login() {
  return (
    <div className="min-h-screen flex" >
      <div className='hidden lg:block relative w-0 flex-1'>
        <div className='flex h-full justify-center items-center'>
          <Image
            className=''
            src="/images/logo_gold.png"
            alt="Diocese de Joinville"
            width={100}
            height={100}
          />  
        </div>
      </div>
      <div className='flex flex-1 flex-col justify-center px-4 py-12 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm'>
          <div>
            <Image
              className=''
              src="/images/logo_gold.png"
              alt="Diocese de Joinville"
              width={100}
              height={100}
            />  
          </div>
        </div>
      </div>
    </div>
  )
}
