import { useAppDispatch } from "@/store/hooks";
import { useAppSelector } from "@/store/hooks";
import { Button } from "./ui/button";
import { toggleTheme } from "@/reducers/theme";

const ThemeSwitch = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.theme);
    const targetTheme = theme === "light" ? "dark" : "light";

    return (
        <Button variant="outline" size="sm" onClick={() => dispatch(toggleTheme())}>
            {`Switch to ${targetTheme} mode`}
        </Button>
    )
}

export default ThemeSwitch;