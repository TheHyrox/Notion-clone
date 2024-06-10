"use client";

import { useSettings } from "@/hooks/use-settings";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";

export const SettingsModal = () => {

    const settings = useSettings();

    const toggle = useSettings((store) => store.toggle);
    const isOpen = useSettings((store) => store.isOpen);
    const onClose = useSettings((store) => store.onClose);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        }

        document.addEventListener("keydown", down);
        return () => { document.removeEventListener("keydown", down);}

    }, [toggle]);

    return (
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <h2 className="text-lg font-medium">Settings</h2>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <Label>
                            Appearence
                        </Label>
                        <span className="text-[0.8rem] text-muted-foreground">
                            Customize how Retion looks on your device.
                        </span>
                    </div>
                    <ModeToggle />
                </div>
            </DialogContent>
        </Dialog>
    )

}