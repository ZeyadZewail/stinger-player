"use client";
import { useFileStore } from "@/stores/useFilesStore";
import { convertFileSrc } from "@tauri-apps/api/tauri";

import { useEffect, useRef, useState } from "react";

export const Player = () => {
	const { filePaths } = useFileStore();

	const [currentIndex, setCurrentIndex] = useState(0);

	const videoPlayer = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		videoPlayer.current?.play();
	}, []);

	return (
		<div>
			<video ref={videoPlayer} width={1920} height={1080}>
				<source src={convertFileSrc(filePaths[0])} type="video/mp4" />
			</video>
		</div>
	);
};
