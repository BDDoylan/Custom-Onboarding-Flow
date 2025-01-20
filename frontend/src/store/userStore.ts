import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useUserState = create<UserState>()(
  devtools((set) => ({
    userData: {
      id: null,
      email: null,
      password: null,
      streetAddress: null,
      city: null,
      state: null,
      zipCode: null,
      birthdate: null,
      aboutMe: null,
      stepNumber: 1,
      createdAt: null,
      updatedAt: null,
    },
    updateUserData: (data) => set((state) => ({ userData: { ...state.userData, ...data } })),
  }))
);

export default useUserState;
