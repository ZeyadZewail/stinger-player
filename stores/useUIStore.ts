import { create } from "zustand";

type screenTypes = "home" | "edit";

interface UIStore {
	currentReelID: string;
	setCurrentReelID: (id: string) => void;
	currentVideoPath: string;
	setCurrentVideoPath: (path: string) => void;
}

export const useUIStore = create<UIStore>()((set) => ({
	currentReelID: "",
	setCurrentReelID: (id) => set({ currentReelID: id }),
	currentVideoPath: "",
	setCurrentVideoPath: (path) => set({ currentVideoPath: path }),
}));
