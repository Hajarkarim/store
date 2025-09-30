import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      "euclid-circular-a": ["Euclid Circular A"],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        xl: "0",
      },
      
    },
    colors: {
      current: "currentColor",
      transparent: "transparent",
      white: "#FFFFFF",
      body: "#5D4037", // Warm brown for body text
      meta: {
        DEFAULT: "#FDF6E3", // Warm parchment-like background
        2: "#8B4513", // Saddle brown
        3: "#A0522D", // Sienna
        4: "#CD853F", // Peru
        5: "#DEB887", // Burlywood
      },
      dark: {
        DEFAULT: "#2C1810", // Deep chocolate brown
        2: "#5D4037", // Dark brown
        3: "#795548", // Medium brown
        4: "#A1887F", // Light brown
        5: "#D7CCC8", // Very light brown
      },
      gray: {
        DEFAULT: "#F5F5F0", // Warm off-white
        1: "#FDF6E3", // Parchment
        2: "#FAF0E6", // Linen
        3: "#F5E6D3", // Antique white
        4: "#E6D5B8", // Wheat
        5: "#D2B48C", // Tan
        6: "#BC8F8F", // Rosy brown
        7: "#8B7355", // Dark tan
      },
      blue: {
        DEFAULT: "#1E3A8A", // Deep navy blue (for links/accents)
        dark: "#1E40AF",
        light: "#3B82F6",
        "light-2": "#60A5FA",
        "light-3": "#93C5FD",
        "light-4": "#BFDBFE",
        "light-5": "#DBEAFE",
      },
      red: {
        DEFAULT: "#B91C1C", // Deep red
        dark: "#991B1B",
        light: "#DC2626",
        "light-2": "#EF4444",
        "light-3": "#FCA5A5",
        "light-4": "#FECACA",
        "light-5": "#FEE2E2",
        "light-6": "#FEF2F2",
      },
      green: {
        DEFAULT: "#15803D", // Forest green
        dark: "#166534",
        light: "#16A34A",
        "light-2": "#22C55E",
        "light-3": "#4ADE80",
        "light-4": "#86EFAC",
        "light-5": "#BBF7D0",
        "light-6": "#DCFCE7",
      },
      yellow: {
        DEFAULT: "#D97706", // Amber
        dark: "#B45309",
        "dark-2": "#92400E",
        light: "#F59E0B",
        "light-1": "#FBBF24",
        "light-2": "#FDE68A",
        "light-4": "#FFFBEB",
      },
      teal: {
        DEFAULT: "#0D9488", // Teal green
        dark: "#0F766E",
      },
      orange: {
        DEFAULT: "#EA580C", // Warm orange
        dark: "#C2410C",
      },
      // New book store specific colors
      brown: {
        DEFAULT: "#8B4513", // Saddle brown
        dark: "#654321", // Dark brown
        light: "#A0522D", // Sienna
        "light-2": "#CD853F", // Peru
        "light-3": "#DEB887", // Burlywood
        "light-4": "#F5DEB3", // Wheat
        "light-5": "#FAEBD7", // Antique white
      },
      cream: {
        DEFAULT: "#FDF5E6", // Old lace
        dark: "#FAF0E6", // Linen
        light: "#FFF8DC", // Cornsilk
      }
    },
    screens: {
      xsm: "375px",
      lsm: "425px",
      "3xl": "2000px",
      ...defaultTheme.screens,
    },
    extend: {
      fontSize: {
        "2xs": ["10px", "17px"],
        "heading-1": ["60px", "72px"],
        "heading-2": ["48px", "64px"],
        "heading-3": ["40px", "48px"],
        "heading-4": ["30px", "38px"],
        "heading-5": ["28px", "40px"],
        "heading-6": ["24px", "30px"],
        "custom-xl": ["20px", "24px"],
        "custom-lg": ["18px", "24px"],
        "custom-sm": ["14px", "22px"],
        "custom-xs": ["12px", "20px"],
        "custom-2xl": ["24px", "34px"],
        "custom-4xl": ["36px", "48px"],
        "custom-1": ["22px", "30px"],
        "custom-2": ["32px", "38px"],
        "custom-3": ["35px", "45px"],
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        6.5: "1.625rem",
        7.5: "1.875rem",
        8.5: "2.125rem",
        9.5: "2.375rem",
        10.5: "2.625rem",
        11: "2.75rem",
        11.5: "2.875rem",
        12.5: "3.125rem",
        13: "3.25rem",
        13.5: "3.375rem",
        14: "3.5rem",
        14.5: "3.625rem",
        15: "3.75rem",
        15.5: "3.875rem",
        16: "4rem",
        16.5: "4.125rem",
        17: "4.25rem",
        17.5: "4.375rem",
        18: "4.5rem",
        18.5: "4.625rem",
        19: "4.75rem",
        19.5: "4.875rem",
        21: "5.25rem",
        21.5: "5.375rem",
        22: "5.5rem",
        22.5: "5.625rem",
        24.5: "6.125rem",
        25: "6.25rem",
        25.5: "6.375rem",
        26: "6.5rem",
        27: "6.75rem",
        27.5: "6.875rem",
        29: "7.25rem",
        29.5: "7.375rem",
        30: "7.5rem",
        31: "7.75rem",
        31.5: "7.875rem",
        32.5: "8.125rem",
        33: "8.25rem",
        34: "8.5rem",
        34.5: "8.625rem",
        35: "8.75rem",
        36.5: "9.125rem",
        37: "9.25rem",
        37.5: "9.375rem",
        39: "9.75rem",
        39.5: "9.875rem",
        40: "10rem",
        42.5: "10.625rem",
        45: "11.25rem",
        46: "11.5rem",
        47.5: "11.875rem",
        49: "12.25rem",
        50: "12.5rem",
        51: "12.75rem",
        51.5: "12.875rem",
        52: "13rem",
        52.5: "13.125rem",
        54: "13.5rem",
        54.5: "13.625rem",
        55: "13.75rem",
        55.5: "13.875rem",
        57.5: "14.375rem",
        59: "14.75rem",
        60: "15rem",
        62.5: "15.625rem",
        65: "16.25rem",
        67: "16.75rem",
        67.5: "16.875rem",
        70: "17.5rem",
        72.5: "18.125rem",
        75: "18.75rem",
        90: "22.5rem",
        92.5: "23.125rem",
        94: "23.5rem",
        100: "25rem",
        110: "27.5rem",
        115: "28.75rem",
        122.5: "30.625rem",
        125: "31.25rem",
        127.5: "31.875rem",
        132.5: "33.125rem",
        142.5: "35.625rem",
        150: "37.5rem",
        166.5: "41.625rem",
        171.5: "42.875rem",
        180: "45rem",
        187.5: "46.875rem",
        192.5: "48.125rem",
        203: "50.75rem",
        230: "57.5rem",
      },
      maxWidth: {
        30: "7.5rem",
        40: "10rem",
        50: "12.5rem",
      },
      zIndex: {
        999999: "999999",
        99999: "99999",
        9999: "9999",
        999: "999",
        99: "99",
        1: "1",
      },
      boxShadow: {
        1: "0px 1px 2px 0px rgba(139, 69, 19, 0.15)", // Brown shadow
        2: "0px 6px 24px 0px rgba(205, 133, 63, 0.15), 0px 2px 4px 0px rgba(139, 69, 19, 0.05)",
        3: "0px 2px 16px 0px rgba(44, 24, 16, 0.12)", // Dark brown shadow
        testimonial:
          "0px 0px 4px 0px rgba(139, 69, 19, 0.10), 0px 6px 12px 0px rgba(222, 184, 135, 0.25)",
        breadcrumb: "0px 1px 0px 0px #E6D5B8, 0px -1px 0px 0px #E6D5B8",
        range:
          "0px 0px 1px 0px rgba(44, 24, 16, 0.08), 0px 2px 2px 0px rgba(44, 24, 16, 0.06)",
        filter: "0px 1px 0px 0px #E6D5B8",
        list: "1px 0px 0px 0px #E6D5B8",
        input: "inset 0 0 0 2px #8B4513", // Saddle brown focus
      },
    },
  },
  plugins: [],
}; 

export default config;