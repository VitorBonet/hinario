import { ICelebrationPartMusicDTOS } from "./ICelebrationPartMusicDTOS";
import { ICelebrationsDTOS } from "./ICelebrationsDTOS";
import { ICyclesDTOS } from "./ICyclesDTOS";
import { IPartDTOS } from "./IPartDTOS";
import { IYearsDTOS } from "./IYearsDTOS";

export interface ICelebrationPartDTOS {
  id: string;
  dioceseId: string;
  yearId: string;
  year: IYearsDTOS;
  cycleId: string;
  cycle: ICyclesDTOS;
  celebrationId: string;
  celebration: ICelebrationsDTOS;
  partId: string;
  part: IPartDTOS;
  celebrationPartMusic: ICelebrationPartMusicDTOS[];
}