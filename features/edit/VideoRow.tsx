import { Button } from "@/components/ui/button";
import { Slot, useReelStore } from "@/stores/useReelStore";
import { useUIStore } from "@/stores/useUIStore";
import { fs } from "@tauri-apps/api";
import { Check, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ComboBox } from "@/components/ui/comboBox";
import { useStingerStore } from "@/stores/useStingerStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const VideoRow = ({ slot, index }: { slot: Slot; index: number }) => {
  const { currentReelID, setCurrentVideoPath } = useUIStore();
  const { reels, editReel } = useReelStore();
  const { stingers } = useStingerStore();
  const currentReel = reels[currentReelID];

  const [fileExists, setFileExists] = useState<undefined | boolean>(undefined);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: slot.id, animateLayoutChanges: () => false });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    const checkIfExists = async () => {
      const exists = await fs.exists(slot.path);
      setFileExists(exists);
    };

    checkIfExists();
  }, [slot.path]);

  const deleteSlot = () => {
    currentReel.slots.splice(index, 1);
    editReel(currentReel);
  };

  const setCurrentVideo = () => {
    setCurrentVideoPath(slot.path);
  };

  const onChangeBeforeStinger = (value: string) => {
    currentReel.slots[index] = {
      ...currentReel.slots[index],
      stingerBeforeID: value,
    };
    editReel(currentReel);
  };

  const onChangeAfterStinger = (value: string) => {
    currentReel.slots[index] = {
      ...currentReel.slots[index],
      stingerAfterID: value,
    };
    editReel(currentReel);
  };

  return (
    <div
      className="w-full flex gap-2"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Button
        className="w-60 flex-1 block overflow-ellipsis overflow-hidden whitespace-nowrap"
        onClick={setCurrentVideo}
      >
        {slot.name}
      </Button>
      <div className="flex justify-center items-center">
        {fileExists ? (
          <Check className="stroke-green-600" />
        ) : (
          <X className="stroke-red-600" />
        )}
      </div>
      <div>
        <ComboBox
          options={Object.values(stingers).map((s) => {
            return { label: s.name, value: s.id };
          })}
          value={currentReel.slots[index].stingerBeforeID}
          onChange={onChangeBeforeStinger}
          name={"Stinger"}
        />
      </div>
      <div>
        <ComboBox
          options={Object.values(stingers).map((s) => {
            return { label: s.name, value: s.id };
          })}
          value={currentReel.slots[index].stingerAfterID}
          onChange={onChangeAfterStinger}
          name={"Stinger"}
        />
      </div>
      <Button variant="destructive" className="w-10 p-0" onClick={deleteSlot}>
        <Trash />
      </Button>
    </div>
  );
};
