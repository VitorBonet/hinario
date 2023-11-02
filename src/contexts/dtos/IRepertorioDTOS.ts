import { ICelebrationPartDTOS } from "./ICelebrationPartDTOS";
import { ICelebrationPartMusicDTOS } from "./ICelebrationPartMusicDTOS";
import { IMusicDTOS } from "./IMusicDTOS";

export interface IRepertorioDTOS {
  id?: string;
  title: string;
  musics: {
    celebrationPartMusicId: string;
    celebrationPartMusic: ICelebrationPartMusicDTOS;
  }[];
  createdAt?: Date;
}