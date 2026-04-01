"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, MonitorCog } from "lucide-react";

const themes = ["light", "dark", "system"] as const;

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const idx = React.useMemo(() => {
    const current = (theme ?? resolvedTheme ?? "system") as typeof themes[number];
    return Math.max(0, themes.indexOf(current));
  }, [theme, resolvedTheme]);

  const nextTheme = React.useCallback(() => {
    const next = (idx + 1) % themes.length;
    setTheme(themes[next]);
  }, [idx, setTheme]);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" aria-label="Toggle theme">
        <MonitorCog className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  const current = themes[idx];

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={nextTheme}
      aria-label="Toggle theme"
      className="cursor-pointer border-ring"
    >
      {current === "light" && (
        <Sun className="h-[1.2rem] w-[1.2rem] text-primary " />
      )}
      {current === "dark" && (
        <Moon className="h-[1.2rem] w-[1.2rem] text-primary " />
      )}
      {current === "system" && (
        <MonitorCog className="h-[1.2rem] w-[1.2rem] text-primary " />
      )}
    </Button>
  );
}
