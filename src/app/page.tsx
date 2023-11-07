import { NavigationHeaderButtons } from '@/components/NavigationHeaderButtons'
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import { MapPinIcon, MailIcon, PhoneIcon } from "lucide-react"
import { AiFillYoutube, AiFillInstagram } from "react-icons/ai"
import { BsFacebook } from "react-icons/bs"
import Link from 'next/link';

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
            <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">VENHA PREPARAR A </h3>
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

      <section className=' flex flex-col items-center justify-center w-full bg-red-secondary pt-14 min-h-[35rem]' >  
        <div className='absolute right-0 mt-[-36rem]'>
          <Image
            src="/images/musicalNote2.png"
            alt="note"
            height={300}
            width={300}
          />   
        </div>
        <div className='flex justify-around gap-6 h-full'>
          <div className='flex justify-center flex-col gap-2 p-4 text-white max-w-md'>
            <div>
              <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">CANTOS E </h3>
              <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">LOUVORES</h3>
            </div>
            <p>
            A Liturgia é um memorial, no qual Deus se faz presente na comunidade e age nos ritos sagrados por meio de Cristo. 
            Sendo assim, o canto litúrgico alcança seu sentido quando é sintonizado e acompanha harmoniosamente os ritos da celebração, 
            sem se desviar do verdadeiro sentido de cada momento da celebração. O importante é cantar a Liturgia, e não simplesmente cantar na Liturgia. 
            O canto e a música litúrgica são partes necessárias e integrantes e devem ser a expressão da fé e da vida cristã de cada assembleia.
            </p>
            <div>
              <Button size="sm">MUSICAS</Button>
            </div>
          </div>
          <div className='relative h-[20rem] w-[40rem] hidden md:block'>
          <Image
            src="/images/tablatura.png"
            alt="Tablatura"
            // height={50}
            // width={500}
            objectFit='cover'
            
            fill
            />  
          </div>
        </div>  
      </section>

      <section className='w-full bg-white pt-10 min-h-[10rem]' >  
        <div className='flex items-center justify-center flex-col md:flex-row md:justify-around md:items-start gap-6'>
          <div className='flex flex-col gap-2 mt-10 text-red-primary max-w-md'>
            <div>
              <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">CONTATO</h3>
            </div>
            <div className='flex gap-2'>
              <MapPinIcon/><p>RUA JAGUARUNA 147, JOINVILLE, SC</p>
            </div>
            <div className='flex gap-2'>
              <MailIcon/><p>pastoral@diocesejoinville.com.br</p>
            </div>
            <div className='flex gap-2'>
              <PhoneIcon/><p>(47) 3451-3700</p>
            </div>
          </div>
          <div>
            <Image
              style={{ 'zIndex': 10, position: 'relative' }}
              src="/images/celular.png"
              alt="Celular"
              height={500}
              width={500}
            />  
          </div>
        </div>  
      </section>

      <section className='w-full bg-red-primary text-white pt-14 pb-14 mt-[-5rem]' >  
        <div className='flex justify-around items-center'>
          <div className='flex gap-2 items-center'>
            <div className='relative h-24 w-56 hidden md:block'>
              <Image
                src="/images/logoDiocese.png"
                alt="Logo Diocese de Joinville"
                fill
                objectFit='cover'
              />  
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-sm'>POWERED BY <Link href="https://vbsoftbr.com" className='text-[#bb946c] hover:underline'>VBSOFT</Link></p>
              <p  className='text-sm'>© COPYRIGHT 2023</p>
            </div>
          </div>
          <div className='flex gap-4 items-center'>
            <Link href="#"><AiFillYoutube size={30} /></Link>
            <Link href="#"><AiFillInstagram size={26} /></Link>
            <Link href="#"><BsFacebook size={22} /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
