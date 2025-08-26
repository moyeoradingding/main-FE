import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  user_id: number;
  email: string;
  nickname: string;
  profile_image_url?: string;
  role?: string;
  idol_id?: number;
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  updateUser: (updatedFields: Partial<User>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null,
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
      login: (user, accessToken, refreshToken) => {
        set({
          user,
          isLoggedIn: true,
          accessToken: accessToken || '',
          refreshToken: refreshToken || '',
        });
        // console.log('useUserStore: login action - state after set:', get());
        const nick = user.nickname || user.email || '사용자';
        sessionStorage.setItem('nickname', nick);
      },
      logout: () => {
        set({
          user: null,
          isLoggedIn: false,
          accessToken: null,
          refreshToken: null,
        });
        // console.log('useUserStore: logout action - state after set:', get());
      },
      updateUser: updatedFields => {
        set(state => ({
          user: state.user ? { ...state.user, ...updatedFields } : state.user,
        }));
        // console.log(
        //   'useUserStore: updateUser action - state after set:',
        //   get(),
        // );
      },
    }),
    {
      name: 'user-storage',
    },
  ),
);
