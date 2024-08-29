"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export const KeyCaptureWrapper = ({ children }: { children: ReactNode }) => {
	const router = useRouter();

	if (typeof document !== "undefined") {
		document.onkeydown = function (evt) {
			evt = evt || window.event;
			var isEscape = false;
			if ("key" in evt) {
				isEscape = evt.key === "Escape" || evt.key === "Esc";
			} else {
				//@ts-ignore
				isEscape = evt.keyCode === 27;
			}
			if (isEscape) {
				router.back();
			}
		};
	}

	return children;
};
