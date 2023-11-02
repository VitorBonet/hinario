'use client'

import Part from "@/components/Admins/Pages/Part"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

export default function PartsAdd() {
  return (
    <div className="container pt-20 flex flex-col gap-4 justify-around w-full" >
      <div className="flex gap-6">
        <div className="cursor-pointer" onClick={() => history.back()}>
          <ArrowLeft />
        </div>
      </div>

      <Part 
        title="Criar Parte de Celebração"
        subtitle="Adicionar uma nova parte de celebração"
      />
    </div>
  )
}
