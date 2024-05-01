/** @type {import('tailwindcss').Config} */
export default {
     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
     theme: {
          screens: {
               "5xl": { max: "1920px" },
               // => @media (max-width: 1920px) { ... }

               "4xl": { max: "1600px" },
               // => @media (max-width: 1600px) { ... }

               "3xl": { max: "1535px" },
               // => @media (max-width: 1535px) { ... }

               "2xl": { max: "1420px" },
               // => @media (max-width: 1420px) { ... }

               xl: { max: "1279px" },
               // => @media (max-width: 1279px) { ... }

               lg: { max: "1150px" },
               // => @media (max-width: 1150px) { ... }

               "3md": { max: "1024px" },
               // => @media (max-width: 1024px) { ... }

               "2md": { max: "870px" },
               // => @media (max-width: 920px) { ... }

               md: { max: "767px" },
               // => @media (max-width: 767px) { ... }

               sm: { max: "639px" },
               // => @media (max-width: 639px) { ... }
          },
          borderColor: (theme) => ({
               ...theme("colors"),
               default: theme("colors.gray.300", "currentColor"),
               primary: "#8E8EA9",
               danger: "#e3342f",
          }),
          extend: {
               zIndex: {
                    1: "1",
                    5: "5",
                    100: "100",
                    rightSideBar: "1000",
                    profile: "2000",
                    modal: "9999",
               },
               fontFamily: {
                    karla: ["var(--font-karla)"],
                    poppins: ["var(--font-poppins)"],
               },
               boxShadow: {
                    full: "0 0 3px 1px rgba(0,0,0,0.1)",
               },
               colors: {
                    primary500: "#120956",
                    transparent: "transparent",
                    current: "currentColor",
                    black: "#000000",
                    white: "#ffffff",
                    yellow: "##ffd700",
                    softPurple: "#4A4A6A",
                    success: "#01BF37",
                    grey200: "#8E8EA9",
                    warning: "#FF7A00",
                    warning100: "#FFD178",
                    error: "#D02B20",
                    primaryDefault: "#4130AB",
                    secondaryDefault: "#4C31D1",
                    borderDashed: "#9747FF",
                    tertiaryHover: "#D0DAFF",
                    tertiaryPressed: "#C2CFFF",
                    cardHover: "#d6d2e9",
                    cardInactive: "#EE5E52",
                    cardChecked: "#ABE9BC",
                    navBarBg: "#060225",

                    primaryPrimary100: "#7c5cfc",
                    primaryPrimary200: "#5e43d8",
                    primaryPrimary300: "#432eb5",
                    primaryPrimary400: "#2d1d92",
                    primaryPrimary500: "#120956",
                    secondarySecondary100: "#e7ebf3",
                    secondarySecondary200: "#eaf5ff",
                    secondarySecondary300: "#377de7",
                    secondarySecondary400: "#0049b7",
                    secondarySecondary500: "#00398f",
                    surfaceSurface100: "rgba(0,0,0,0.08)",
                    surfaceSurface200: "#EAEAEF",
                    surfaceSurface300: "#8E8EA9",
                    surfaceSurface400: "#666687",
                    surfaceSurface800: "#060225",
                    surfaceLighter: "#E7EBF3",
                    dark: "#020617",
                    darker: "#64748B",
                    darkest: "#334155",
                    disabledText: "#CBD5E1",
               },
               scale: {
                    85: "0.85",
               },
               flexGrow: {
                    1.5: 1.5,
                    2: 2,
               },
               gridTemplateColumns: {
                    dashboard: "repeat(auto-fill, minmax(360px,1fr))",
               },
               gridTemplateRows: {
                    dashboard: "repeat(auto-fit, minmax(1fr,1fr))",
               },
          },
     },
     plugins: [],
};
