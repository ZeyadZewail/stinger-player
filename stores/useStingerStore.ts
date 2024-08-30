import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Stinger {
  id: string;
  name: string;
  path: string;
  beforeDelay: number;
  afterDelay: number;
}

export interface StingerStore {
  stingers: { [key: string]: Stinger };
  addStinger: (stinger: Stinger) => void;
  removeStinger: (id: string) => void;
  editStinger: (stinger: Stinger) => void;
}

export const useStingerStore = create<StingerStore>()(
  persist(
    (set) => ({
      stingers: {},
      addStinger: (stinger) =>
        set((state) => {
          state.stingers[stinger.id] = stinger;
          return state.stingers;
        }),
      removeStinger: (id) =>
        set((state) => {
          delete state.stingers[id];
          return state.stingers;
        }),
      editStinger: (stinger) =>
        set((state) => {
          state.stingers[stinger.id] = stinger;
          return state.stingers;
        }),
    }),
    {
      name: "Stingers-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
