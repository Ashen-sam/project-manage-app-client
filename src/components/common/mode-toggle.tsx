import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"


export const ModeToggle = () => {
    const { themeColor, setTheme, setThemeColor } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mode</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Color</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setThemeColor("default")}>
                    <span className="flex items-center gap-2">
                        Default {themeColor === "default" && "✓"}
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setThemeColor("purple")}>
                    <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-purple-500"></span>
                        Purple {themeColor === "purple" && "✓"}
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setThemeColor("blue")}>
                    <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                        Blue {themeColor === "blue" && "✓"}
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setThemeColor("orange")}>
                    <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-orange-500"></span>
                        orange {themeColor === "orange" && "✓"}
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setThemeColor("green")}>
                    <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-green-500"></span>
                        green {themeColor === "green" && "✓"}
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
