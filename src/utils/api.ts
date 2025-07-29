import axios from 'axios';
import { Profile } from '../types/profile';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL!;
export const createProfileInAPI = async (data: Profile): Promise<Profile> => {
  const res = await axios.post(API_BASE_URL, data);
  return res.data;
};
export const updateProfileInAPI = async (data: Profile): Promise<Profile> => {
  if (!data.id) throw new Error('Profile ID is required to update');
  const res = await axios.put(`${API_BASE_URL}/${data.id}`, data);
  return res.data;
};
export const deleteProfileFromAPI = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
