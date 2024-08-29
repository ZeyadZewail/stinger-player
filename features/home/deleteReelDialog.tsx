import {DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Dialog} from "@radix-ui/react-dialog";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {Reel, useReelStore} from "@/stores/useReelStore";
import {useState} from "react";

export const DeleteReelDialog = ({reel}: { reel: Reel }) => {
    const {removeReel} = useReelStore();
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-10 p-0" onClick={() => setOpen(true)}>
                    <Trash/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-primary text-primary-foreground">
                <DialogHeader>
                    <DialogTitle>Delete Reel</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    Are you sure you want to delete {reel.name}?
                </div>
                <DialogFooter>
                    <Button onClick={() => {
                        setOpen(false);
                    }}>Cancel</Button>
                    <Button onClick={() => {
                        removeReel(reel.id)
                    }} variant="destructive">Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
