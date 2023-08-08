import { NavigationHeaderButtons } from '@/components/NavigationHeaderButtons'
import { Button } from '@/components/ui/button';
import Image from 'next/image'

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col" >
      {/* <NavigationHeaderMenu /> */}
      <NavigationHeaderButtons />

      <section className='w-full bg-red-primary pt-14 min-h-[40rem]' >   
        <Image
          className='absolute left-[-310px]'
          src="/images/logo_gold.png"
          alt="Diocese de Joinville"
          width={600}
          height={200}
        />  
        <div className='flex justify-center items-center flex-col gap-6 h-full min-h-[40rem]'>
          <Image
            src="/images/logo_gold.png"
            alt="Diocese de Joinville"
            width={150}
            height={150}
          />  
          <div className='flex justify-center items-center flex-col text-white'>
            <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">VENHA PLANEJAR O REPERTÓRIO DA </h3>
            <h1 className={`font-carabella text-8xl mt-[12px] `}>Celebração</h1>
          </div>
          <h4 className="scroll-m-20 text-xm tracking-tight text-gray-400">
            Ferramenta de idealização da
          </h4>
          <h4 className="scroll-m-20 text-xm tracking-tight text-gray-400 mt-[-25px]">
            animação da celebração
          </h4>

          <div>
            <Image
              className='absolute ml-10'
              src="/images/brilho.png"
              alt="Brilho"
              width={100}
              height={100}
            /> 

            <Button variant="outline" size="sm">Comece Já</Button>

            <Image
              src="/images/brilho.png"
              alt="Brilho"
              width={100}
              height={100}
            />  

          </div>
        </div>  
      </section>
    </div>
  )
}
