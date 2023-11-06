import { ICelebrationPartDTOS } from "./ICelebrationPartDTOS";
import { ICelebrationPartMusicDTOS } from "./ICelebrationPartMusicDTOS";
import { IMusicDTOS } from "./IMusicDTOS";

export interface IRepertorioDTOS {
  id?: string;
  title: string;
  repertoireCelebrationPartMusic: {
    celebrationPartMusicId: string;
    celebrationPartMusic?: ICelebrationPartMusicDTOS;
  }[];
  createdAt?: Date;
  createdByUser: {
		id: string;
		name: string;
		email: string;
	},
}