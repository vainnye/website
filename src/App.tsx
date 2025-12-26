import { Home } from "./pages/Home";
import { ThemeProvider } from "./components/Provider/ThemeProvider";
import { LocaleProvider } from "./components/Provider/LocaleProvider";

export function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LocaleProvider>
          <Home />
        </LocaleProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
