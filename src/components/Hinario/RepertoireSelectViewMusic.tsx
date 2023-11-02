"use client"

import { AiOutlinePlus } from 'react-icons/ai'
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRepertoire } from "@/contexts/RepertoireContext"
import { ICelebrationPartMusicDTOS } from "@/contexts/dtos/ICelebrationPartMusicDTOS"

interface IRepertoireSelectViewMusicProps {
  viewMusic: ICelebrationPartMusicDTOS | null;
}

export function RepertoireSelectViewMusic({ viewMusic }: IRepertoireSelectViewMusicProps) {
  const { repertoire, setRepertoire } = useRepertoire();

  const addMusicRepertoire = () => {
    if (!viewMusic) return;
    
    const filteredMusicsRepertoire = repertoire?.musics.filter(cp => cp.celebrationPartMusic.celebrationPartId !== viewMusic.celebrationPartId);
    if (filteredMusicsRepertoire && repertoire) {
      const newRep = repertoire;
      newRep.musics = filteredMusicsRepertoire
      newRep.musics.push({ celebrationPartMusicId: viewMusic.id, celebrationPartMusic: viewMusic });
      setRepertoire({ title: '', musics: newRep.musics })
    } else {
      setRepertoire({ title: '', musics: [ { celebrationPartMusicId: viewMusic.id, celebrationPartMusic: viewMusic } ] })
    }
  }

  return (
    <div className="w-full flex flex-col gap-4 ">
      {viewMusic ? (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">{viewMusic.music.title}</h1>
              {!viewMusic.required ? (<p className='text-sm tracking-tight'>Opcional (Não corresponde a antifona)</p>): null }
            </div>
            <div className="text-red-primary hover:text-red-secondary cursor-pointer" onClick={addMusicRepertoire}><AiOutlinePlus /></div>
          </div>
          <p className="text-sm tracking-tight max-h-48 overflow-auto"> 
            <div dangerouslySetInnerHTML={{__html: viewMusic.music.lyrics}}></div>
          </p>
        </>
      ) : null}
    </div>
  )
}
