"use client"

import { useEffect, RefObject, useCallback } from 'react';

const useClickOutside = (refs: RefObject<HTMLElement | null>[], callback: () => void) => {
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            refs.every(
                (ref) => ref.current && !ref.current.contains(event.target as Node)
            )
        ) {
            callback();
        }
    }, [callback, refs]);

    useEffect(() => {
        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Detach the event listener when the component is unmounted
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [refs, callback, handleClickOutside]);
};

export default useClickOutside;