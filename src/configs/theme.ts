"use client";

import {Work_Sans} from "next/font/google";
import {createTheme} from "@mui/material/styles";

const roboto = Work_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FE645E"
    },
    text: {
      primary: "#000000",
      disabled: "#B1B1B1",
      secondary: "#5C5C5C",
    }
  },
  typography: {
    h1: {
      fontWeight: 500,
      fontSize: "45px",
      lineHeight: "normal",

      // "@media (max-width:768px)": {
      //   fontSize: "30px",
      // },
    },
    h2: {
      
    },
    h3: {
      
    },
    h4: {
      
    },
    h5: {
      fontWeight: 500,
      fontSize: "22px",
      lineHeight: "normal",
    },
    h6: {
      fontWeight: 500,
      fontSize: "20px",
      lineHeight: "normal",
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "18px",
      color: "#5C5C5C",
      lineHeight: "normal",

      // "@media (max-width:768px)": {
      //   fontSize: "15px",
      // },
    },
    subtitle2: {
      fontWeight: 300,
      fontSize: "15px",
      color: "#5C5C5C",
      lineHeight: "normal",

      // "@media (max-width:768px)": {
      //   fontSize: "12px",
      // },
    },
    body1: {
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: "normal",

      // "@media (max-width:768px)": {
      //   fontSize: "13px",
      // },
    },
    body2: {
      fontWeight: 500,
      fontSize: "12px",
      color: "#98A2B3",
      lineHeight: "normal",

      // "@media (max-width:768px)": {
      //   fontSize: "9px",
      // },
    },
    button: {

    },
    caption: {

    },
    overline: {

    },
    allVariants: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: "48px",
          fontSize: "16px",
          borderRadius: "8px",
          textTransform: "none",
          "@media (max-width:768px)": {
            height: "34px",
            fontSize: "12px",
          },
          "&.MuiButton-contained": {
            color: "white",
            backgroundColor: "#FE645E",
            "&:hover": {
              backgroundColor: "#b14641",
            },
          },
          "&.MuiButton-outlined": {
            color: "#FE645E",
            borderColor: "#FE645E",
            "&:hover": {
              borderColor: "#FE645E",
              backgroundColor: "rgba(255, 0, 0, 0.04)", // Light red on hover for outlined
            },
          },
          "&.Mui-disabled": { // Styles for disabled buttons
            color: "rgba(0, 0, 0, 0.26)", // Default color for disabled buttons
            backgroundColor: "rgba(0, 0, 0, 0.12)", // Default background color for disabled buttons
            borderColor: "rgba(0, 0, 0, 0.26)", // Default border color for disabled outlined buttons
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderWidth: "1px",
          "& .MuiInputBase-multiline": {
            height: "auto !important"
          },
          "& .MuiInputBase-root": {
            height: "48px",
            padding: "0px",
            borderRadius: "8px",
            "@media (max-width:768px)": {
              height: "35px",
            },
          },
          "& .MuiInputBase-input": {
            padding: "14px",
            display: "flex",
            fontWeight: 300,
            fontSize: "15px",
            color: "#5C5C5C",
            alignItems: "center",
            height: "-webkit-fill-available",
          },
          "& .MuiOutlinedInput-root": {
            borderColor: "#494949",
            "& fieldset": {
              borderColor: "#494949",
            },
            "&:hover fieldset": {
              borderColor: "#494949",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#494949",
            },
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#5C5C5C",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
            borderColor: "#494949"
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "18px",
          "@media (max-width:768px)": {
            fontSize: "15px",
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 376,
      sm: 426,
      md: 851,
      lg: 1025,
      xl: 1441,
    },
  },
});