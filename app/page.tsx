"use client";
import { Home } from "@/features/home/Home";

const Page = () => {
	async function setupAppWindow() {
		const WebviewWindow = (await import("@tauri-apps/api/window")).WebviewWindow;
		const newWindow = new WebviewWindow("theUniqueLabel", {
			url: "/player",
			width: 960,
			height: 540,
			title: "Stinger-Player (Player)",
		});
		newWindow.once("tauri://created", () => {
			// webview window successfully created
			console.log("Webview window successfully created");
		});

		newWindow.once("tauri://error", (e) => {
			// an error occurred during webview window creation
			console.error("Error creating webview window:", e);
		});
	}

	const handleClick = async () => {
		await setupAppWindow();
	};

	return (
		<div>
			<Home />
			<button onClick={handleClick}>player</button>
		</div>
	);
};

export default Page;
