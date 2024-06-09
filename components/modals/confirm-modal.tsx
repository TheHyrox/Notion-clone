"use client";

import { cn } from "@/lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { buttonVariants } from "../ui/button";

interface ConfirmModalProps {
    children: React.ReactNode;
    onConfirm: () => void;
}

export const ConfirmModal = ({ children, onConfirm }: ConfirmModalProps) => {

    const handleConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        onConfirm();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure ? Like really ?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction className={cn(buttonVariants({variant: "destructive"}))} onClick={handleConfirm}>Delete forever</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}