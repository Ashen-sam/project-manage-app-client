import { RouterProvider } from "react-router-dom"
import { router } from "./routes/routes"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "sonner"
import "@xyflow/react/dist/style.css";

const App = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </div>
  )
}

export default App