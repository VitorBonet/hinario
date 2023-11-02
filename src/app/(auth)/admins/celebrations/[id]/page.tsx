'use client'

import Celebration from "@/components/Admins/Pages/Celebration"
import { ICelebrationsDTOS } from "@/contexts/dtos/ICelebrationsDTOS";
import { api } from "@/services/apiClient";
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { id: string } }) {
  const [year, setYear] = useState<ICelebrationsDTOS>();

  const getDataItem = async (id: string) => {
    const response = await api.get(`/admins/celebrations/${id}`);
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

      <Celebration 
        title="Criar Celebração"
        subtitle="Editar a Celebração"
        data={year}
      />
    </div>
  )
}
