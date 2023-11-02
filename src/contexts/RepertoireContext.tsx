'use client'

import { api } from '@/services/apiClient';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { IYearsDTOS } from './dtos/IYearsDTOS';
import { IHinaarioParametersDTOS } from './dtos/IHinaarioParametersDTOS';
import { ICyclesDTOS } from './dtos/ICyclesDTOS';
import { ICelebrationsDTOS } from './dtos/ICelebrationsDTOS';
import { IMusicDTOS } from './dtos/IMusicDTOS';
import { useAuth } from './AuthContext';
import { ICelebrationPartDTOS } from './dtos/ICelebrationPartDTOS';
import { IRepertorioDTOS } from './dtos/IRepertorioDTOS';

type RepertoireProviderProps = {
  children: ReactNode;
}

type RepertoireContextData = {
  page: number;
  parameter: IHinaarioParametersDTOS;
  years: IYearsDTOS[] | [];
  cycles: ICyclesDTOS[] | [];
  celebrations: ICelebrationsDTOS[] | [];
  celebrationsParts: ICelebrationPartDTOS[] | [];
  musics: IMusicDTOS[] | [];
  repertoire: IRepertorioDTOS | undefined;
  setRepertoire: Dispatch<SetStateAction<IRepertorioDTOS | undefined>>;
  createRepertoire: (data: IRepertorioDTOS) => boolean;
  selectParameters: (params: IHinaarioParametersDTOS) => void;
  nextPage: () => void;
  backPage: () => void;
};

export const RepertoireContext = createContext({} as RepertoireContextData);

export function RepertoireProvider({ children }: RepertoireProviderProps) {
  const [page, setPage] = useState(1);
  const [years, setYears] = useState([]);
  const [cycles, setCycles] = useState([]);
  const [celebrations, setCelebrations] = useState([]);
  const [celebrationsParts, setCelebrationsParts] = useState([]);
  const [musics, setMusics] = useState([]);
  const [parameter, setParameter] = useState({} as IHinaarioParametersDTOS);
  const [repertoire, setRepertoire] = useState<IRepertorioDTOS>();
  const { user } = useAuth();

  function nextPage() {
    setPage(old => old + 1);
  }
  
  function backPage() {
    setPage(old => { 
      let newValue = old - 1;
      if (newValue == 0) {
        return 1;
      }
      return newValue;
     });
  }

  const getYears = async () => {
    const response = await api.get('/admins/years');
    setYears(response.data);
  }

  const getCycles = async (yearId: string) => {
    const response = await api.get('/masterData/cycles', {
      params: { 
        yearId,
        dioceseId: user.dioceseId,
      }
    });
    setCycles(response.data);
  }

  const getCelebrations = async (yearId: string, cycleId: string) => {
    const response = await api.get('/masterData/celebrations', {
      params: { 
        yearId, 
        cycleId,
        dioceseId: user.dioceseId,
      }
    });
    setCelebrations(response.data);
  }

  const getParts = async (yearId: string, cycleId: string, celebrationId: string) => {
    const response = await api.get('/musics/parts', {
      params: { 
        yearId, 
        cycleId,
        dioceseId: user.dioceseId,
        celebrationId,
      }
    });
    setCelebrationsParts(response.data);
  }


  const getMusics = async (yearId: string, cycleId: string, celebrationId: string) => {
    const response = await api.get('/musics', {
      params: { 
        yearId, 
        cycleId,
        dioceseId: user.dioceseId,
        celebrationId,
      }
    });
    setMusics(response.data);
  }

  const selectParameters = (params: IHinaarioParametersDTOS) => {
    const newParameter = parameter;
    if (params.dioceseId) newParameter.dioceseId = params.dioceseId;
    if (params.yearId) {
      newParameter.yearId = params.yearId;
      getCycles(params.yearId);
    }
    if (params.cycleId) {
      newParameter.cycleId = params.cycleId;
      if (parameter.yearId) getCelebrations(parameter.yearId, params.cycleId);
    }
    if (params.celebrationId) {
      newParameter.celebrationId = params.celebrationId;
      if (parameter.yearId && parameter.cycleId) getParts(parameter.yearId, parameter.cycleId, params.celebrationId);
    };

    setParameter(newParameter);
  }

  const createRepertoire = (data: IRepertorioDTOS) => {
    console.log('createRepertoire', data);
    return true;
  }

  useEffect(() => {
    getYears();
  }, [])

  return (
    <RepertoireContext.Provider
      value={{
        page,
        parameter,
        years,
        cycles,
        celebrations,
        celebrationsParts,
        musics,
        repertoire, 
        setRepertoire,
        createRepertoire,
        selectParameters,
        nextPage,
        backPage,
      }}>
      {children}
    </RepertoireContext.Provider>
  )
}

export const useRepertoire = () => {
  return useContext(RepertoireContext);
}