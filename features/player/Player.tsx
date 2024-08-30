"use client";

import { convertFileSrc } from "@tauri-apps/api/tauri";

import { useEffect, useRef, useState } from "react";
import { useUIStore } from "@/stores/useUIStore";
import { useReelStore } from "@/stores/useReelStore";
import { useStingerStore } from "@/stores/useStingerStore";

export const Player = () => {
  const { currentReelID, currentVideoPath, setCurrentVideoPath } = useUIStore();
  const { reels, editReel } = useReelStore();
  const { stingers } = useStingerStore();
  const currentReel = reels[currentReelID];

  const [currentIndex, setCurrentIndex] = useState(0);

  const videoPlayer = useRef<HTMLVideoElement>(null);
  const stingerBeforePlayer = useRef<HTMLVideoElement>(null);
  const stingerAfterPlayer = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEnded = () => {
      if (currentIndex < currentReel.slots.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    };

    if (
      stingerAfterPlayer.current &&
      currentReel.slots[currentIndex]?.stingerAfterID
    ) {
      stingerAfterPlayer.current.addEventListener("ended", handleEnded);
    } else if (videoPlayer.current) {
      videoPlayer.current.addEventListener("ended", handleEnded);
    }

    return () => {
      if (
        stingerAfterPlayer.current &&
        currentReel.slots[currentIndex]?.stingerAfterID
      ) {
        stingerAfterPlayer.current.removeEventListener("ended", handleEnded);
      } else if (videoPlayer.current) {
        videoPlayer.current.removeEventListener("ended", handleEnded);
      }
    };
  }, [
    videoPlayer,
    stingerBeforePlayer,
    currentIndex,
    currentReel.slots.length,
  ]);

  useEffect(() => {
    if (stingers[currentReel.slots[currentIndex]?.stingerBeforeID]?.path) {
      stingerBeforePlayer.current?.play();
      setTimeout(() => {
        videoPlayer.current?.play();
      }, stingers[currentReel.slots[currentIndex]?.stingerBeforeID]?.beforeDelay);
    } else {
      videoPlayer.current?.play();
    }

    if (
      stingers[currentReel.slots[currentIndex]?.stingerAfterID]?.path &&
      videoPlayer.current
    ) {
      videoPlayer.current.addEventListener("ended", () => {
        setTimeout(() => {
          stingerAfterPlayer.current?.play();
        }, stingers[currentReel.slots[currentIndex]?.stingerAfterID]?.afterDelay);
      });
    }
  }, [currentIndex]);

  return (
    <div>
      <video
        ref={videoPlayer}
        width={1920}
        height={1080}
        key={
          currentReel.slots[currentIndex]
            ? `${currentReel.slots[currentIndex].name}${currentIndex}`
            : "videoPlayer"
        }
      >
        <source
          src={convertFileSrc(currentReel.slots[currentIndex]?.path)}
          type="video/mp4"
        />
      </video>
      <video
        ref={stingerBeforePlayer}
        width={1920}
        height={1080}
        key={
          currentReel.slots[currentIndex]?.stingerBeforeID
            ? currentReel.slots[currentIndex]?.stingerBeforeID
            : "stingerBeforePlayer"
        }
        style={{ position: "absolute", top: 0, left: 0, zIndex: 99 }}
      >
        <source
          src={convertFileSrc(
            stingers[currentReel.slots[currentIndex]?.stingerBeforeID]?.path,
          )}
          type="video/mp4"
        />
      </video>
      <video
        ref={stingerAfterPlayer}
        width={1920}
        height={1080}
        key={
          currentReel.slots[currentIndex]?.stingerAfterID
            ? currentReel.slots[currentIndex]?.stingerAfterID
            : "stingerAfterPlayer"
        }
        style={{ position: "absolute", top: 0, left: 0, zIndex: 99 }}
      >
        <source
          src={convertFileSrc(
            stingers[currentReel.slots[currentIndex]?.stingerAfterID]?.path,
          )}
          type="video/mp4"
        />
      </video>
    </div>
  );
};
