"use client"

import { useRepertoire } from "@/contexts/RepertoireContext"
import { YearPage } from "./YearPage"
import { CyclePage } from "./CyclePage"
import { CelebrationPage } from "./CelebrationPage";
import { RepertoirePage } from "./RepertoirePage";

export function PageDefault() {
  const { page } = useRepertoire();

  return (
    <>
    {page == 1 ? ( <YearPage /> ) : null}
    {page == 2 ? ( <CyclePage /> ) : null}
    {page == 3 ? ( <CelebrationPage /> ) : null}
    {page == 4 ? ( <RepertoirePage /> ) : null}
    </>
  )
}
