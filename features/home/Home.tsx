"use client";
import {Button} from "@/components/ui/button";
import {Reel, useReelStore} from "@/stores/useReelStore";
import {useUIStore} from "@/stores/useUIStore";
import {Film, Plus} from "lucide-react";
import {useRouter} from "next/navigation";
import {v4 as uuidv4} from "uuid";
import {DeleteReelDialog} from "@/features/home/deleteReelDialog";

export const Home = () => {
    const {reels, addReel} = useReelStore();
    const {setCurrentReelID} = useUIStore();
    const router = useRouter();

    const addNewReel = () => {
        const newIndex = Object.keys(reels).length + 1;
        const newID = uuidv4();
        const newReel: Reel = {
            id: newID,
            name: `Reel ${newIndex}`,
            slots: [],
            desc: "",
        };
        addReel(newReel);
    };

    const navToReel = (id: string) => {
        setCurrentReelID(id);
        router.push("/edit");
    };

    return (
        <div className="w-full flex flex-col justify-center items-center gap-4  pb-12">
            <div className="text-4xl">Stinger Player</div>
            <Button className="absolute right-2 top-2" onClick={() => {
                router.push('/manage-stingers')
            }}>Manage Stingers</Button>
            {Object.values(reels).map((r, index) => {
                return (
                    <div className="flex gap-2" key={r.id}><Button
                        className="flex gap-2 w-40"
                        onClick={() => {
                            navToReel(r.id);
                        }}>
                        {r.name}
                    </Button><DeleteReelDialog reel={r}/></div>
                );
            })}
            <Button className=" w-52 flex gap-2" onClick={addNewReel}>
                <div className="flex">
                    <Film/> <Plus/>
                </div>
            </Button>
        </div>

    );
};
