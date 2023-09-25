import axios from 'axios';
import queryString from 'query-string';
import { PetProfileInterface, PetProfileGetQueryInterface } from 'interfaces/pet-profile';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPetProfiles = async (
  query?: PetProfileGetQueryInterface,
): Promise<PaginatedInterface<PetProfileInterface>> => {
  const response = await axios.get('/api/pet-profiles', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPetProfile = async (petProfile: PetProfileInterface) => {
  const response = await axios.post('/api/pet-profiles', petProfile);
  return response.data;
};

export const updatePetProfileById = async (id: string, petProfile: PetProfileInterface) => {
  const response = await axios.put(`/api/pet-profiles/${id}`, petProfile);
  return response.data;
};

export const getPetProfileById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/pet-profiles/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePetProfileById = async (id: string) => {
  const response = await axios.delete(`/api/pet-profiles/${id}`);
  return response.data;
};
