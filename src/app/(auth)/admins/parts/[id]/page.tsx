'use client'

import Part from "@/components/Admins/Pages/Part"
import { IPartDTOS } from "@/contexts/dtos/IPartDTOS";
import { api } from "@/services/apiClient";
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { id: string } }) {
  const [part, setPart] = useState<IPartDTOS>();

  const getDataItem = async (id: string) => {
    const response = await api.get(`/admins/parts/${id}`);
    setPart(response.data);
  }

  useEffect(() => {
    getDataItem(params.id)
  }, []);
  return (
    <div className="container pt-20 flex flex-col gap-4 justify-around w-full" >
      <div className="flex gap-6">
        <div className="cursor-pointer" onClick={() => history.back()}>
          <ArrowLeft />
        </div>
      </div>

      <Part 
        title="Editar Parte de Celebração"
        subtitle="Editar parte de celebração"
        data={part}
      />
    </div>
  )
}
