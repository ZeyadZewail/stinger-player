"use client";
import { Button } from "@/components/ui/button";
import { Reel, useReelStore } from "@/stores/useReelStore";
import { useUIStore } from "@/stores/useUIStore";
import { ChevronLeft, Play, Plus } from "lucide-react";
import { ChangeEvent, useEffect, useRef } from "react";
import { open } from "@tauri-apps/api/dialog";
import { VideoRow } from "./VideoRow";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { useNavigate } from "react-router-dom";
import { WebviewWindow } from "@tauri-apps/api/window";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

export const Edit = () => {
  const { currentReelID, currentVideoPath, setCurrentVideoPath } = useUIStore();
  const { reels, editReel } = useReelStore();
  const currentReel = reels[currentReelID];

  const navigate = useNavigate();

  const videoPlayer = useRef<HTMLVideoElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    if (videoPlayer.current) {
      videoPlayer.current.load();
    }
  }, [currentVideoPath]);

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...currentReel,
      name: event.target.value,
    };
    editReel(newState);
  };

  const addNewVideos = async () => {
    const selected = await open({
      multiple: true,
      filters: [
        {
          name: "Video Files",
          extensions: ["webm", "mp4", "mkv", "mov"],
        },
      ],
    });

    if (Array.isArray(selected)) {
      const newReel: Reel = {
        ...currentReel,
        slots: [
          ...currentReel.slots,
          ...selected.map((s) => {
            return {
              id: uuidv4(),
              name: s.split("\\").pop() as string,
              path: s,
              stingerBeforeID: "",
              stingerAfterID: "",
            };
          }),
        ],
      };
      editReel(newReel);
    } else if (selected === null) {
      // user cancelled the selection
    } else {
      const newReel: Reel = {
        ...currentReel,
        slots: [
          ...currentReel.slots,
          {
            id: uuidv4(),
            name: selected.split("/").pop() as string,
            path: selected,
            stingerBeforeID: "",
            stingerAfterID: "",
          },
        ],
      };
      editReel(newReel);
    }
  };

  async function setupAppWindow() {
    const newWindow = new WebviewWindow("theUniqueLabel", {
      url: "/player",
      width: 1280,
      height: 720,
      title: "Stinger-Player (Player)",
      resizable: false,
      focus: false,
    });
  }

  const handlePlay = async () => {
    await setupAppWindow();
  };

  return (
    <div className="min-w-screen min-h-screen flex flex-col p-4 pb-12 justify-between ">
      <div>
        <div className="flex gap-4">
          <div
            onClick={() => {
              navigate(-1);
              setCurrentVideoPath("");
            }}
            className="cursor-pointer p-1"
          >
            <ChevronLeft />
          </div>
          <input
            className="h-full text-2xl w-40 bg-transparent"
            value={currentReel.name}
            onChange={onNameChange}
          />
        </div>
        <div className="flex">
          <div className="flex w-full p-4 flex-col overflow-auto max-h-[500px] gap-2 overflow-x-hidden">
            <div className="grid grid-rows-1 grid-cols-3 w-full">
              <div className="row-span-4">Clip</div>
              <div className="pl-10">Before</div>
              <div>After</div>
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={(e) => {
                const { active, over } = e;
                if (over === null) {
                  return;
                }
                let newSlots = currentReel.slots;
                if (active.id !== over.id) {
                  const oldIndex = currentReel.slots.findIndex(
                    (i) => i.id === active.id,
                  );
                  const newIndex = currentReel.slots.findIndex(
                    (i) => i.id === over.id,
                  );

                  newSlots = arrayMove(currentReel.slots, oldIndex, newIndex);
                }
                editReel({ ...currentReel, slots: newSlots });
              }}
            >
              <SortableContext items={currentReel.slots}>
                {currentReel.slots.map((s, index) => {
                  return (
                    <VideoRow key={s.path + index} slot={s} index={index} />
                  );
                })}
              </SortableContext>
            </DndContext>
            <Button className="flex gap-2" onClick={addNewVideos}>
              Add Video(s) <Plus />
            </Button>
          </div>
          <div
            style={{ width: 1267, height: 350 }}
            className="flex justify-center items-center border-gray-500 border rounded-2xl overflow-hidden"
          >
            {currentVideoPath ? (
              <video
                ref={videoPlayer}
                width={1267}
                height={720}
                controls
                autoPlay
              >
                <source
                  src={convertFileSrc(currentVideoPath)}
                  type="video/mp4"
                />
              </video>
            ) : (
              <div>Pick a Video to preview</div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <Button className="flex text-xl" onClick={handlePlay}>
          Play
          <Play height={20} />
        </Button>
      </div>
    </div>
  );
};
