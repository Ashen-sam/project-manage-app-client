
import { createContext, useContext, useEffect, useState } from "react"


type Theme = "dark" | "light" | "system"
type ThemeColor = "default" | "purple" | "blue" | "orange" | "green"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    defaultColor?: ThemeColor
    storageKey?: string
    colorStorageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    themeColor: ThemeColor
    setTheme: (theme: Theme) => void
    setThemeColor: (color: ThemeColor) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    themeColor: "default",
    setTheme: () => null,
    setThemeColor: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    defaultTheme = "system",
    defaultColor = "default",
    storageKey = "vite-ui-theme",
    colorStorageKey = "vite-ui-theme-color",
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        const stored = sessionStorage.getItem(storageKey)
        return (stored as Theme) || defaultTheme
    })

    const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
        const stored = sessionStorage.getItem(colorStorageKey)
        return (stored as ThemeColor) || defaultColor
    })

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"

            root.classList.add(systemTheme)
        } else {
            root.classList.add(theme)
        }
    }, [theme])

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("theme-default", "theme-purple", "theme-blue", "theme-orange", "theme-green")
        root.classList.add(`theme-${themeColor}`)
    }, [themeColor])

    const value = {
        theme,
        themeColor,
        setTheme: (theme: Theme) => {
            sessionStorage.setItem(storageKey, theme)
            setTheme(theme)
        },
        setThemeColor: (color: ThemeColor) => {
            sessionStorage.setItem(colorStorageKey, color)
            setThemeColor(color)
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}
