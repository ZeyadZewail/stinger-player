import {Button} from "@/components/ui/button";
import {Slot, useReelStore} from "@/stores/useReelStore";
import {useUIStore} from "@/stores/useUIStore";
import {fs} from "@tauri-apps/api";
import {Check, Trash, X} from "lucide-react";
import {useEffect, useState} from "react";
import {ComboBox} from "@/components/ui/comboBox";

export const VideoRow = ({slot, index}: { slot: Slot; index: number }) => {
    const {currentReelID, setCurrentVideoPath} = useUIStore();
    const {reels, editReel} = useReelStore();
    const currentReel = reels[currentReelID];

    const [fileExists, setFileExists] = useState<undefined | boolean>(undefined);

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

    return (
        <div className="w-full flex gap-2 ">
            <Button className="w-60 flex-1 block overflow-ellipsis overflow-hidden whitespace-nowrap"
                    onClick={setCurrentVideo}>
                {slot.name}
            </Button>
            <div className="flex justify-center items-center">
                {fileExists ? <Check className="stroke-green-600"/> : <X className="stroke-red-600"/>}
            </div>
            <div><ComboBox options={[]} name={"Stinger"}/></div>
            {/*<div><ComboBox options={[]} name={"Stinger"}/></div>*/}
            <Button variant="destructive" className="w-10 p-0" onClick={deleteSlot}>
                <Trash/>
            </Button>
        </div>
    );
};
