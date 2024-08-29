"use client"
import {Check, ChevronsUpDown} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {useState} from "react";

export interface comboBoxOption {
    label: string;
    value: string
}

export const ComboBox = ({options, name}: { options: comboBoxOption[], name: string }) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button

                    role="combobox"
                    aria-expanded={open}
                    className="w-[150px] justify-between"
                >
                    {value
                        ? options.find((o) => o.value === value)?.label
                        : `Select ${name}`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-0 bg-primary">
                <Command className="bg-primary text-primary-foreground">
                    <CommandInput placeholder={`Search ${name}...`}/>
                    <CommandList>
                        <CommandEmpty>No {name} found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((o) => (
                                <CommandItem
                                    key={o.value}
                                    value={o.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === o.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {o.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
