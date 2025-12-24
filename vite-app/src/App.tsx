import { Toaster } from "sonner";
import { Home } from "./pages/Home";
import { ThemeProvider } from "./components/theme-provider";

export function App() {
  // return <ComponentExample />;
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Home />
      </ThemeProvider>
      <Toaster /> {/* <-- mount Toaster here instead */}
    </>
  );
}

export default App;
