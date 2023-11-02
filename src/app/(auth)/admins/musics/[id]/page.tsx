'use client'

import Music from "@/components/Admins/Pages/Music"
import { IMusicDTOS } from "@/contexts/dtos/IMusicDTOS";
import { api } from "@/services/apiClient";
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { id: string } }) {
  const [music, setMusic] = useState<IMusicDTOS>();

  const getDataItem = async (id: string) => {
    const response = await api.get(`/admins/musics/${id}`);
    setMusic(response.data);
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

      <Music 
        title="Editar musica"
        subtitle="Editar musica"
        data={music}
      />
    </div>
  )
}
