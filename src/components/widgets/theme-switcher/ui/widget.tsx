import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/theme/provider";

export function Widget() {
    const { theme, setTheme } = useTheme();

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    return (
        <button onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Moon /> : <Sun />}
        </button>
    );
}
