import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export interface Slot {
    name: string;
    path: string;
    stingerBeforeID: string;
    stingerAfterID: string;
}

export interface Reel {
    id: string;
    name: string;
    desc: string;
    slots: Slot[];
}

export interface ReelStore {
    reels: { [key: string]: Reel };
    addReel: (reel: Reel) => void;
    removeReel: (id: string) => void;
    editReel: (reel: Reel) => void;
}

export const useReelStore = create<ReelStore>()(
    persist(
        (set) => ({
            reels: {},
            addReel: (reel) =>
                set((state) => {
                    state.reels[reel.id] = reel;
                    return state.reels;
                }),
            removeReel: (id) =>
                set((state) => {
                    delete state.reels[id];
                    return state.reels;
                }),
            editReel: (reel) =>
                set((state) => {
                    state.reels[reel.id] = reel;
                    return state.reels;
                }),
        }),
        {
            name: "Reels-storage", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);
