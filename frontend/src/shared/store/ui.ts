import { create } from "zustand";
import type { ErrorApp } from "../api/client";

type UIStore = {
  editOpenProfile: boolean;
  createOpenPost: boolean;
  postIdEdit: null | number;
  isOpenLogin: boolean;
  globalError?: ErrorApp;

  openProfile: () => void;
  closeProfile: () => void;

  openCreatePost: () => void;
  closeCreatePost: () => void;

  openEditPost: (postIdEdit: number) => void;
  closeEditPost: () => void;

  openLogin: () => void;
  closeLogin: () => void;

  setGlobalError: (globalError?: ErrorApp) => void;
};

export const useUI = create<UIStore>((set) => ({
  editOpenProfile: false,
  createOpenPost: false,
  postIdEdit: null,
  isOpenLogin: false,
  globalError: {} as ErrorApp,

  openProfile: () => set({ editOpenProfile: true }),
  closeProfile: () => set({ editOpenProfile: false }),

  openCreatePost: () => set({ createOpenPost: true }),
  closeCreatePost: () => set({ createOpenPost: false }),

  openEditPost: (postIdEdit: number) => set({ postIdEdit }),
  closeEditPost: () => set({ postIdEdit: null }),

  openLogin: () => set({ isOpenLogin: true }),
  closeLogin: () => set({ isOpenLogin: false }),

  setGlobalError: (globalError) => set({ globalError }),
}));
