import localFont from "next/font/local";

// Path is resolved relative to this file. `variable` exposes the font as a
// CSS custom property so it can be used from SCSS modules.
export const sanskrit = localFont({
  src: "../fonts/Sanskrit-2003.ttf",
  variable: "--font-sanskrit",
  display: "swap",
});
