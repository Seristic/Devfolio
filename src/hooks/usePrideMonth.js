// Kept for backwards compatibility — use useSeasonalTheme instead
import useSeasonalTheme from "./useSeasonalTheme";
const usePrideMonth = () => {
    const { isPride } = useSeasonalTheme();
    return { isPride };
};
export default usePrideMonth;