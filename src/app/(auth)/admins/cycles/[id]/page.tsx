'use client'

import Cycle from "@/components/Admins/Pages/Cycle"
import { ICyclesDTOS } from "@/contexts/dtos/ICyclesDTOS";
import { api } from "@/services/apiClient";
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { id: string } }) {
  const [year, setYear] = useState<ICyclesDTOS>();

  const getDataItem = async (id: string) => {
    const response = await api.get(`/admins/cycles/${id}`);
    setYear(response.data);
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

      <Cycle 
        title="Criar Ciclo"
        subtitle="Adicionar um novo ciclo"
        data={year}
      />
    </div>
  )
}
