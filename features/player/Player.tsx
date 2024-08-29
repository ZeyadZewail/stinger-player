"use client";

import {convertFileSrc} from "@tauri-apps/api/tauri";

import {useEffect, useRef, useState} from "react";
import {useUIStore} from "@/stores/useUIStore";
import {useReelStore} from "@/stores/useReelStore";

export const Player = () => {
    const {currentReelID, currentVideoPath, setCurrentVideoPath} = useUIStore();
    const {reels, editReel} = useReelStore();
    const currentReel = reels[currentReelID];


    const [currentIndex, setCurrentIndex] = useState(0);

    const videoPlayer = useRef<HTMLVideoElement>(null);
    const stingerPlayer = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoPlayerRef = videoPlayer.current;
        const handleEnded = () => {

            if (currentIndex < currentReel.slots.length - 1) {
                setCurrentIndex((prevIndex) => prevIndex + 1);
            } else {
                setCurrentIndex(0);
            }
        };

        const handlePlay = () => {
            console.log("PLAYED");
            if (stingerPlayer.current) {
                stingerPlayer.current.play();
            }
        };

        const handlePause = () => {
            console.log("PAUSED");
            if (stingerPlayer.current) {
                stingerPlayer.current.pause();
            }
        };

        if (videoPlayer.current) {
            videoPlayer.current.addEventListener("ended", handleEnded);
            videoPlayer.current.addEventListener("play", handlePlay);
            videoPlayer.current.addEventListener("pause", handlePause);
        }

        return () => {
            if (videoPlayerRef) {
                videoPlayerRef.removeEventListener("ended", handleEnded);
                videoPlayerRef.removeEventListener("play", handlePlay);
                videoPlayerRef.removeEventListener("pause", handlePause);
            }
        };
    }, [videoPlayer, stingerPlayer, currentIndex, currentReel.slots.length]);

    useEffect(() => {
        videoPlayer.current?.play();
    }, [currentIndex]);


    return (
        <div>
            <video ref={videoPlayer} width={1920} height={1080} key={
                currentReel.slots[currentIndex]
                    ? `${currentReel.slots[currentIndex].name}${currentIndex}`
                    : "videoPlayer"
            }>
                <source src={convertFileSrc(currentReel.slots[currentIndex]?.path)} type="video/mp4"/>
            </video>
            {/*<video ref={stingerPlayer} width={1920} height={1080} key={stinger ? stinger.name : "stingerPlayer"}*/}
            {/*       style={{position: "absolute", top: 0, left: 0, zIndex: 99}}>*/}
            {/*    <source src={''} type="video/mp4"/>*/}
            {/*</video>*/}
        </div>
    );
};
