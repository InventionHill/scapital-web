"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DialogContextType {
    isOpen: boolean;
    openDialog: (data?: any) => void;
    closeDialog: () => void;
    dialogData: any;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [dialogData, setDialogData] = useState<any>(null);

    const openDialog = (data?: any) => {
        setDialogData(data || null);
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        // Optional: clear data on close, or keep it. Clearing is safer to avoid stale state next time.
        // setDialogData(null); 
        // Actually, let's delay clearing or just keep it until next open overwrite. 
        // Better to clear on close to avoid side effects if opened without data next time.
        setTimeout(() => setDialogData(null), 300); // Wait for animation
    };

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <DialogContext.Provider value={{ isOpen, openDialog, closeDialog, dialogData }}>
            {children}
        </DialogContext.Provider>
    );
}

export function useDialog() {
    const context = useContext(DialogContext);
    if (context === undefined) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
}
