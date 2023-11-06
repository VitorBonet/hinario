"use client"

import { useRouter } from "next/navigation";

interface IRepertoiresCardProps {
  id: string;
  title: string;
  year: string;
  cycle: string;
  celebration: string;
  musics: string;
}

export function RepertoiresCard({
  id,
  title,
  year,
  cycle,
  celebration,
  musics,
}: IRepertoiresCardProps) {
  const router = useRouter();

  return (
    <div className='bg-red-secondary w-full p-8 lg:w-5/6 flex justify-between'>
      <div className='flex flex-col justify-between'>
        <div>
          <h3 className="text-3x1 md:text-3x1 lg:text-3x1 tracking-tight font-extrabold uppercase">{title}</h3>
        </div>
        <div>
          <h3 className="text-sm tracking-tight">Ano: {year}</h3>
          <h3 className="text-sm tracking-tight">Ciclo: {cycle}</h3>
          <h3 className="text-sm tracking-tight">Celebração: {celebration}</h3>
        </div>
        <div>
          <p className="text-sm tracking-tight">{musics}</p>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div onClick={() => router.push(`/repertoires/cifras/${id}`)} className={`w-[90px] pl-4 pr-4 pb-2 pt-2 rounded-full cursor-pointer bg-red-primary text-white hover:bg-white hover:text-red-primary`}>
          <p className="oll-m-20 text-sm text-center">Letra</p>
        </div>
        <div onClick={() => router.push(`/repertoires/cifras/${id}`)} className={`w-[90px] pl-4 pr-4 pb-2 pt-2 rounded-full cursor-pointer bg-red-primary text-white hover:bg-white hover:text-red-primary`}>
          <p className="oll-m-20 text-sm text-center">Cifra</p>
        </div>
        <div className={`w-[90px] pl-4 pr-4 pb-2 pt-2 rounded-full cursor-pointer bg-red-primary text-white hover:bg-white hover:text-red-primary`}>
          <p className="oll-m-20 text-sm text-center">Partitura</p>
        </div>
        <div className={`w-[90px] pl-4 pr-4 pb-2 pt-2 rounded-full cursor-pointer bg-red-primary text-white hover:bg-white hover:text-red-primary`}>
          <p className="oll-m-20 text-sm text-center">Slide</p>
        </div>
      </div>
    </div>
  )
}
