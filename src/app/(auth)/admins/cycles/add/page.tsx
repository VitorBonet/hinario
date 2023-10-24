'use client'

import Cycle from "@/components/Admins/Pages/Cycle"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

export default function YearsAdd() {
  return (
    <div className="container pt-20 flex flex-col gap-4 justify-around w-full" >
      <div className="flex gap-6">
        <div className="cursor-pointer" onClick={() => history.back()}>
          <ArrowLeft />
        </div>
      </div>

      <Cycle 
        title="Criar Ciclo"
        subtitle="Adicionar um novo ciclo"
      />
    </div>
  )
}
