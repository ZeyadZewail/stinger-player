import { useStingerStore } from "@/stores/useStingerStore";
import { Button } from "@/components/ui/button";
import { open } from "@tauri-apps/api/dialog";
import { v4 as uuidv4 } from "uuid";
import { ChevronLeft, Plus } from "lucide-react";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { useNavigate } from "react-router-dom";
import { useUIStore } from "@/stores/useUIStore";
import { useRef } from "react";
import { StingerRow } from "@/features/manage-stingers/stinger-row";

export const ManageStingers = () => {
  const { stingers, addStinger } = useStingerStore();
  const { currentVideoPath, setCurrentVideoPath } = useUIStore();
  const navigate = useNavigate();
  const videoPlayer = useRef<HTMLVideoElement>(null);

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
      selected.map((s) => {
        addStinger({
          id: uuidv4(),
          name: s.split("\\").pop() as string,
          path: s,
          afterDelay: 0,
          beforeDelay: 0,
        });
      });
    } else if (selected === null) {
      // user cancelled the selection
    } else {
      addStinger({
        id: uuidv4(),
        name: selected.split("\\").pop() as string,
        path: selected,
        afterDelay: 0,
        beforeDelay: 0,
      });
    }
  };

  return (
    <div className="min-w-screen min-h-screen flex flex-col p-4 pb-12 justify-between">
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
          <div className="h-full text-2xl w-60 bg-transparent">
            Manage Stingers
          </div>
        </div>
        <div className="flex">
          <div className="flex w-full p-4 flex-col overflow-auto max-h-[500px] gap-2">
            <div className="flex w-full">
              <div className="w-[280px]">Clip</div>
              <div className="w-[90px]">Before (ms)</div>
              <div>After (ms)</div>
            </div>
            {Object.values(stingers).map((s, index) => {
              return <StingerRow key={s.path + index} stinger={s} />;
            })}
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
                key={currentVideoPath}
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
    </div>
  );
};
