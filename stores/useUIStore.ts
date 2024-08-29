import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

interface UIStore {
    currentReelID: string;
    setCurrentReelID: (id: string) => void;
    currentVideoPath: string;
    setCurrentVideoPath: (path: string) => void;
}

export const useUIStore = create<UIStore>()(persist((set) => ({
    currentReelID: "",
    setCurrentReelID: (id) => set({currentReelID: id}),
    currentVideoPath: "",
    setCurrentVideoPath: (path) => set({currentVideoPath: path}),
}), {
    name: "UI-storage", // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
}));
