import { ICelebrationPartDTOS } from "./ICelebrationPartDTOS";
import { ICelebrationPartMusicDTOS } from "./ICelebrationPartMusicDTOS";

export interface IPartDTOS {
  id: string;
  description: string;
  createdAt: Date,
  celebrationPart: ICelebrationPartDTOS[]
}