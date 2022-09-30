import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

export interface ITarefa {
  id: string;
  title: string;
  isCompleted: boolean;
}

const api = Api();

export const getAll = async (): Promise<ITarefa[] | ApiException> => {
  try {
    const { data } = await api.get('/tarefas');
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao conectar api');
  }
};

export const getById = async (id: string): Promise<ITarefa | ApiException> => {
  try {
    const { data } = await api.get(`/tarefas/${id}`);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao conectar api');
  }
};

export const create = async (
  dataToCreate: Omit<ITarefa, 'id'>
): Promise<ITarefa | ApiException> => {
  try {
    const { data } = await api.post('/tarefas', dataToCreate);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao conectar api');
  }
};

export const updateById = async (id: string, dataToUpdate: ITarefa) => {
  try {
    const { data } = await api.put(`/tarefas/${id}`, dataToUpdate);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao conectar api');
  }
};

export const deleteById = async (
  id: string
): Promise<undefined | ApiException> => {
  try {
    await api.delete(`/tarefas/${id}`);
    return undefined;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao conectar api');
  }
};
