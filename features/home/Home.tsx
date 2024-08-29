"use client";
import { open } from "@tauri-apps/api/dialog";
import { useFileStore } from "@/stores/useFilesStore";

export const Home = () => {
	const { filePaths, setFilePaths } = useFileStore();

	const handleOpenPicker = async () => {
		const selected = await open({
			multiple: true,
			filters: [
				{
					name: "Video Files",
					extensions: ["webm", "mp4"],
				},
			],
		});

		if (Array.isArray(selected)) {
			setFilePaths(selected);
		} else if (selected === null) {
			// user cancelled the selection
		} else {
			setFilePaths([selected]);
		}
	};

	return (
		<div>
			<button onClick={handleOpenPicker}>Choose</button>
			<div>
				{filePaths.map((f) => (
					<div key={f}>{f}</div>
				))}
			</div>
		</div>
	);
};
