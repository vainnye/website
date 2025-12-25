import { Toaster } from "sonner";
import { Home } from "./pages/Home";
import { ThemeProvider } from "./components/Provider/ThemeProvider";
import { LocaleProvider } from "./components/Provider/LocaleProvider";
import config from "./config";

export function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LocaleProvider defaultLng={config.default_lng}>
          <Home />
          <Toaster />
        </LocaleProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
