import { useState, useEffect, use } from "react";

export const useScrollTop = (thresholder = 10) => { 
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > thresholder) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    }, [thresholder]);

    return scrolled;
};