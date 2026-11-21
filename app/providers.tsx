"use client";

import { Theme } from "@astryxdesign/core/theme";
import { themes, defaultThemeSlug, themeModes } from "../astryx-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Theme
      theme={themes[defaultThemeSlug]}
      mode={themeModes[defaultThemeSlug] ?? "system"}
    >
      {children}
    </Theme>
  );
}
