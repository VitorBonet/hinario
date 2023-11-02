import { ICelebrationPartDTOS } from "./ICelebrationPartDTOS";
import { IMusicDTOS } from "./IMusicDTOS";

export interface ICelebrationPartMusicDTOS {
  id: string;
  celebrationPartId: string;
  musicId: string;
  music: IMusicDTOS;
  required: boolean;
  celebrationPart: ICelebrationPartDTOS
}