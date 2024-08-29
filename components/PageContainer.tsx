"use client";
import {ReactNode} from "react";

export const PageContainer = ({children}: { children: ReactNode }) => {
    return <div className="min-w-screen min-h-screen bg-black text-white">{children}</div>;
};
