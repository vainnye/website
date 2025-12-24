website\vite-app\tailwind.config.ts
```

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary, var(--primary))",
        "primary-foreground": "var(--color-primary-foreground, var(--primary-foreground))",
        secondary: "var(--color-secondary, var(--secondary))",
        "secondary-foreground": "var(--color-secondary-foreground, var(--secondary-foreground))",
        background: "var(--color-background, var(--background))",
        foreground: "var(--color-foreground, var(--foreground))",
      },
    },
  },
  plugins: [],
};

export default config;
