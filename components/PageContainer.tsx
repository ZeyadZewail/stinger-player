"use client";
import { ReactNode } from "react";

export const PageContainer = ({ children }: { children: ReactNode }) => {
	return <div className="w-screen h-screen bg-black text-white">{children}</div>;
};
