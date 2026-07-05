import { useMemo } from "react";

/**
 * Returns the active seasonal theme based on the current month.
 *
 * To preview a theme during development, temporarily override `month`:
 *   const month = 5;   // Pride (June)
 *   const month = 9;   // Halloween (October)
 *   const month = 11;  // Christmas (December)
 */
const useSeasonalTheme = () => {
    const theme = useMemo(() => {
        const month = new Date().getMonth(); // 0-indexed
        if (month === 5) return "pride";
        if (month === 9) return "halloween";
        if (month === 11) return "christmas";
        return null;
    }, []);

    return {
        theme,
        isPride: theme === "pride",
        isHalloween: theme === "halloween",
        isChristmas: theme === "christmas",
        isSeasonal: theme !== null,
    };
};

export default useSeasonalTheme;