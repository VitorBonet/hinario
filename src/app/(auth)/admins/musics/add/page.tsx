'use client'

import Music from "@/components/Admins/Pages/Music"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

export default function MusicsAdd() {
  return (
    <div className="container pt-20 flex flex-col gap-4 justify-around w-full" >
      <div className="flex gap-6">
        <div className="cursor-pointer" onClick={() => history.back()}>
          <ArrowLeft />
        </div>
      </div>

      <Music 
        title="Criar Musica"
        subtitle="Adicionar uma nova musica"
      />
    </div>
  )
}
