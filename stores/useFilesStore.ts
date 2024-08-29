import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FileStore {
	filePaths: string[];
	setFilePaths: (paths: string[]) => void;
}

export const useFileStore = create<FileStore>()(
	persist(
		(set) => ({
			filePaths: [],
			setFilePaths: (paths) => set({ filePaths: paths }),
		}),
		{
			name: "filePaths-storage", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
		}
	)
);
