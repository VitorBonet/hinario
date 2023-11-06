"use client"

import { AiOutlinePlus } from 'react-icons/ai'
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRepertoire } from "@/contexts/RepertoireContext"
import { ICelebrationPartMusicDTOS } from "@/contexts/dtos/ICelebrationPartMusicDTOS"
import { ICelebrationPartDTOS } from '@/contexts/dtos/ICelebrationPartDTOS'
import { RepertoireSelectViewMusic } from './RepertoireSelectViewMusic'

interface IRepertoireSelectMusicProps {
  celebrationPart: ICelebrationPartDTOS;
}

export function RepertoireSelectMusic({ celebrationPart }: IRepertoireSelectMusicProps) {
  const { repertoire, setRepertoire } = useRepertoire();
  const [viewMusic, setViewMusic] = useState<ICelebrationPartMusicDTOS | null>(null);

  return (
    <div>
      <div>
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight text-red-primary">{celebrationPart.part.description}</h1>
        <p className="scroll-m-20 text-sm tracking-tight"> 
          {celebrationPart.part.description}
        </p>
      </div>
      <div>
        {/* <h3 className="scroll-m-20 text-sm font-semibold tracking-tight text-red-primary">OPÇÕES</h3> */}
        <div className="flex gap-6">
          <div className="flex flex-col mt-2 gap-2 min-w-fit">
              <>
              {celebrationPart.celebrationPartMusic.map(cptmMusic => (
                <div 
                  key={cptmMusic.music.id} 
                  onClick={() => {setViewMusic(cptmMusic)}} 
                  className={`w-fit pl-4 pr-4 pb-2 pt-2 rounded-full cursor-pointer ${cptmMusic.required ? "bg-red-primary text-white hover:bg-red-secondary ":"bg-white text-red-primary border-red-primary border hover:bg-gray-100"}`}
                >
                  <p className="oll-m-20 text-sm">{cptmMusic.music.title}</p>
                </div>
              ))}
              </>
          </div>
          <RepertoireSelectViewMusic viewMusic={viewMusic}/>
        </div>
      </div>
    </div>
  )
}
