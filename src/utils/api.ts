import axios from 'axios';
import { Profile } from '../types/profile';

const API_BASE_URL = 'https://6887344d071f195ca97fba2d.mockapi.io/profiles';

export const fetchProfiles = async (): Promise<Profile[]> => {
  const response = await axios.get<Profile[]>(API_BASE_URL);
  return response.data;
};

export const saveProfileToAPI = async (profile: Profile): Promise<Profile> => {
  const response = await axios.post<Profile>(API_BASE_URL, profile);
  return response.data;
};

export const updateProfileInAPI = async (
  id: string,
  profile: Profile
): Promise<Profile> => {
  const response = await axios.put<Profile>(`${API_BASE_URL}/${id}`, profile);
  return response.data;
};

export const deleteProfileFromAPI = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

