'use client'

import Link from 'next/link'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { api } from "@/services/apiClient"
import { useToast } from '@/contexts/ToastContext'
import { IRepertorioDTOS } from '@/contexts/dtos/IRepertorioDTOS'
import { Skeleton } from "@/components/ui/skeleton"
import { Music } from '@/components/Repertoire/Music'

interface IRepertoiresProps {}

export default function RepertoiresView({ params }: { params: { id: string } }) {
  const { addToast } = useToast();
  const [data, setData] = useState<IRepertorioDTOS>();
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState("")

  const getDataItem = async () => {
    const response = await api.get(`/repertoires/${params.id}`);
    setData(response.data);
  }

  useEffect(() => {
    if (params.id) getDataItem();
  }, [params]);

  return (
    <div className="container pl-24 pt-20 flex flex-col gap-4 w-full h-screen bg-white text-black" >
      {data ? (
        <div className='flex flex-col gap-8 pb-20'>
          <div>
            <h1 className="text-4x1 md:text-5xl lg:text-5xl tracking-tight font-extrabold text-red-primary">{data.title}</h1>
            <h3 className="text-2x1 tracking-tight">Repertório criado por {data.createdByUser.name}</h3>
          </div>

          <div>
            <h3 className="text-2xl tracking-tight text-red-primary">Informações</h3>
            <h3 className="text-2x1 tracking-tight"><strong>Ano:</strong> {data.repertoireCelebrationPartMusic[0]?.celebrationPartMusic?.celebrationPart.year.description}</h3>
            <h3 className="text-2x1 tracking-tight"><strong>Ciclo:</strong> {data.repertoireCelebrationPartMusic[0]?.celebrationPartMusic?.celebrationPart.cycle.description}</h3>
            <h3 className="text-2x1 tracking-tight"><strong>Celebração:</strong> {data.repertoireCelebrationPartMusic[0]?.celebrationPartMusic?.celebrationPart.celebration.description}</h3>
          </div>
          
          {data.repertoireCelebrationPartMusic?.map(cpm => (
            <Music 
              title={cpm.celebrationPartMusic?.music.title || ""}
              lyrics={cpm.celebrationPartMusic?.music.lyrics || ""}
              notes={cpm.celebrationPartMusic?.music.notes || []}
            />
          ))}
        </div>
      ) : (
        <>
        <Skeleton className="w-64 h-6" />
        <Skeleton className="w-72 h-6" />
        <Skeleton className="w-full h-32" />
        
        <Skeleton className="w-64 h-6" />
        <Skeleton className="w-72 h-6" />
        <Skeleton className="w-full h-32" />
        </>
      )}
    </div>
  )
}
