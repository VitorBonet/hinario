import { ICelebrationPartMusicDTOS } from "./ICelebrationPartMusicDTOS";

export interface IMusicDTOS {
  id: string;
  title: string;
  lyrics: string;
  audio: string;
  tablatura: string;
  createdAt: Date;
  updatedAt: Date;
  notes: {
    key: string;
    note: string;
    position: number;
  }[];
  celebrationPartMusic: ICelebrationPartMusicDTOS[]
}