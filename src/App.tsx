import { Toaster } from "@/components/ui/sonner";
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
          {/*toast for when a user copies my email*/}
          <Toaster
            position="top-center"
            expand={true}
            swipeDirections={["right", "top", "bottom", "left"]}
            visibleToasts={1}
            duration={2000}
          />
        </LocaleProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
