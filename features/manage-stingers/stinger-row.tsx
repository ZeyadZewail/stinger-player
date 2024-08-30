import { Stinger, useStingerStore } from "@/stores/useStingerStore";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/useUIStore";
import { ChangeEvent, useEffect, useState } from "react";
import { fs } from "@tauri-apps/api";
import { Check, FilePenLine, Trash, X } from "lucide-react";

export const StingerRow = ({ stinger }: { stinger: Stinger }) => {
  const { setCurrentVideoPath, currentVideoPath } = useUIStore();
  const { removeStinger, editStinger, stingers } = useStingerStore();
  stinger = stingers[stinger.id];
  const [fileExists, setFileExists] = useState<undefined | boolean>(undefined);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const checkIfExists = async () => {
      const exists = await fs.exists(stinger.path);
      setFileExists(exists);
    };

    checkIfExists();
  }, [stinger.path]);

  const deleteSlot = () => {
    removeStinger(stinger.id);
  };

  const setCurrentVideo = () => {
    setCurrentVideoPath(stinger.path);
  };

  const handleChangeStingerName = (event: ChangeEvent<HTMLInputElement>) => {
    const newStinger = { ...stinger, name: event.target.value };
    editStinger(newStinger);
  };

  const handleChangeStingerBeforeDelay = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (Number(event.target.value) < 0) {
      return;
    }
    const newStinger = { ...stinger, beforeDelay: Number(event.target.value) };
    editStinger(newStinger);
  };

  const handleChangeStingerAfterDelay = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (Number(event.target.value) < 0) {
      return;
    }
    const newStinger = { ...stinger, afterDelay: Number(event.target.value) };
    editStinger(newStinger);
  };

  document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEnter = false;
    if ("key" in evt) {
      isEnter = evt.key === "Enter";
    } else {
      // Older browsers might use keyCode
      //@ts-ignore
      isEnter = evt.keyCode === 13;
    }

    if (isEnter) {
      // Your logic for when the Enter key is pressed
      setIsEdit(false);
    }
  };

  return (
    <div className="w-full flex gap-2 ">
      {isEdit ? (
        <input
          className="h-full text-lg w-full bg-transparent"
          value={stinger.name}
          onChange={handleChangeStingerName}
        />
      ) : (
        <Button
          className="w-60 flex-1 block overflow-ellipsis overflow-hidden whitespace-nowrap h-full"
          onClick={setCurrentVideo}
        >
          {stinger.name}
        </Button>
      )}
      <input
        className="h-full text-2xl w-20 bg-transparent border border-gray-200 rounded-lg p-1"
        type="number"
        value={stinger.beforeDelay}
        onChange={handleChangeStingerBeforeDelay}
      />
      <input
        className="h-full text-2xl w-20 bg-transparent border border-gray-200 rounded-lg p-1"
        type="number"
        value={stinger.afterDelay}
        onChange={handleChangeStingerAfterDelay}
      />
      <Button
        onClick={() => {
          setIsEdit(!isEdit);
        }}
        className="h-full"
      >
        <FilePenLine />
      </Button>
      <div className="flex justify-center items-center h-full">
        {fileExists ? (
          <Check className="stroke-green-600" />
        ) : (
          <X className="stroke-red-600" />
        )}
      </div>
      <Button
        variant="destructive"
        className="min-w-10 p-0 h-full"
        onClick={deleteSlot}
      >
        <Trash />
      </Button>
    </div>
  );
};
