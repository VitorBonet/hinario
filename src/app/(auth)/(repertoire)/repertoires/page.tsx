'use client'
import Image from 'next/image'

import Celebration from "@/components/Admins/Pages/Celebration"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { ColumnSort } from "@/components/DataTable/ColumnSort"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/DataTable/DataTable"
import { api } from "@/services/apiClient"
import { useToast } from '@/contexts/ToastContext'
import { IRepertorioDTOS } from '@/contexts/dtos/IRepertorioDTOS'
import { RepertoiresCard } from '@/components/Repertoire/RepertoiresCard'
import { Skeleton } from '@/components/ui/skeleton'

interface ICelebrations {
  id: string;
  description: string;
}

export default function Repertoires() {
  const { addToast } = useToast();
  const [data, setData] = useState<IRepertorioDTOS[]>([]);

  const getDataItem = async () => {
    const response = await api.get('/repertoires');
    setData(response.data);
  }

  useEffect(() => {
    getDataItem();
  }, []);

  return (
    <div className="container pt-20 flex flex-col gap-4 w-full h-full bg-red-primary text-white" >
      <div className='absolute right-0 hidden lg:inline-flex'>
        <Image
          src="/images/logo_gold.png"
          alt="Diocese de Joinville"
          width={250}
          height={200}
        />  
      </div>
      <div>
        <h1 className="text-4x1 md:text-5xl lg:text-5xl tracking-tight font-extrabold">REPERTÓRIOS</h1>
        <h3 className="text-2x1 tracking-tight">TODAS AS SUAS CELEBRAÇÕES</h3>
      </div>
      <div className='flex flex-col gap-4 mb-10'>
        {data.length <= 0 ? (
          <>
          <Skeleton className="w-5/6 h-32" />
          <Skeleton className="w-5/6 h-32" />
          <Skeleton className="w-5/6 h-32" />
          <Skeleton className="w-5/6 h-32" />
          </>
        ) : (
          <>
          {data.map(rep => (
            <RepertoiresCard 
              key={rep.id}
              id={rep.id || ""}
              title={rep.title}
              year={rep.repertoireCelebrationPartMusic[0].celebrationPartMusic?.celebrationPart.year.description || ""}
              cycle={rep.repertoireCelebrationPartMusic[0].celebrationPartMusic?.celebrationPart.cycle.description || ""}
              celebration={rep.repertoireCelebrationPartMusic[0].celebrationPartMusic?.celebrationPart.celebration.description || ""}
              musics={rep.repertoireCelebrationPartMusic.map((rcpm, i) => i + 1 + ". " +rcpm.celebrationPartMusic?.music.title).join("; ")}
            />
          ))}
          </>
        )}
      </div>
    </div>
  )
}
