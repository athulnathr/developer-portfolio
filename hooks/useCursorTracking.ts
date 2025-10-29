"use client";

import { useEffect, useState } from "react";

interface CursorPosition {
    x: number;
    y: number;
    normalizedX: number; // -1 to 1
    normalizedY: number; // -1 to 1
}

// Initial state that matches server-rendered content
const initialCursorPosition: CursorPosition = {
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
};

export const useCursorTracking = () => {
    const [cursorPosition, setCursorPosition] = useState<CursorPosition>(initialCursorPosition);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;
            const normalizedX = (x / window.innerWidth) * 2 - 1;
            const normalizedY = -(y / window.innerHeight) * 2 + 1;

            setCursorPosition({
                x,
                y,
                normalizedX,
                normalizedY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return cursorPosition;
};

