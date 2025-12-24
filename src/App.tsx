import { Toaster } from "sonner";
import { Home } from "./pages/Home";
import { ThemeProvider } from "./components/theme-provider";
import { LocaleProvider } from "./components/locale-provider";
import config from "./config";

export function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <LocaleProvider defaultLng={config.default_lng}>
          <Home />
          <Toaster />
        </LocaleProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
