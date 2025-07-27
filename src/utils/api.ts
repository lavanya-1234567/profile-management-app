import { Profile } from '../types/profile';

export const saveProfile = (data: Profile) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem('profile', JSON.stringify(data));
      resolve(data);
    }, 500);
  });
};

export const saveProfileToAPI = async (profile: Profile) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      Math.random() < 0.7
        ? resolve(profile)
        : reject(new Error('API Error: Failed to save profile'));
    }, 1000);
  });
};
