import { RouterProvider } from "react-router-dom"
import { router } from "./routes/routes"
import { ThemeProvider } from "./components/theme-provider"

const App = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  )
}

export default App
