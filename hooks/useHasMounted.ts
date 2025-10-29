"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect when component has mounted on the client side
 * Useful for preventing hydration mismatches with server-rendered content
 */
export const useHasMounted = () => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
};

