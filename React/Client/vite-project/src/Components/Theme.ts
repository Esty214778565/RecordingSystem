import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
  palette: {

    primary: {
      main: "#0f172a", // Rich Dark Navy
      light: "#1e293b",
      dark: "#020617",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#8b5cf6", // Vibrant Gold
      light: "#c5abff",
      dark: "#4a3380",
      contrastText: "#0f172a",
    },
    background: {
      default: "#fafbfc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
    custom: {
      main: "#0f172a", // Rich Dark Navy
      secondary: "#8b5cf6", // Vibrant Gold
      accent: "#8b5cf6", // Royal Purple
      light: "#f8fafc",
      vibrant: "#06b6d4", // Cyan
      success: "#10b981", // Emerald
    },
  },
  typography: {
    fontFamily: "'Inter', 'Playfair Display', serif",
    h1: {
      fontWeight: 900,
      fontFamily: "'Playfair Display', serif",
    },
    h2: {
      fontWeight: 800,
      fontFamily: "'Playfair Display', serif",
    },
    h3: {
      fontWeight: 700,
      fontFamily: "'Playfair Display', serif",
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "16px",
          fontWeight: 700,
          boxShadow: "none",
          padding: "14px 36px",
          fontSize: "1rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(15, 23, 42, 0.08)",
          border: "1px solid rgba(245, 158, 11, 0.1)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          "&:hover": {
            transform: "translateY(-16px) scale(1.02)",
            boxShadow: "0 25px 80px rgba(15, 23, 42, 0.15)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 8px 40px rgba(15, 23, 42, 0.12)",
          backdropFilter: "blur(20px)",
        },
      },
    },
  },
})
export default theme;



// import createTheme from "@mui/material/styles/createTheme";

// declare module '@mui/material/styles' {
//   interface Palette {
//     custom: {
//       main: string;
//       secondary: string;
//       accent: string;
//       light: string;
//       vibrant: string;
//       success: string;
//       gradient: {
//         primary: string;
//         secondary: string;
//         accent: string;
//       };
//     };
//   }

//   interface PaletteOptions {
//     custom?: {
//       main?: string;
//       secondary?: string;
//       accent?: string;
//       light?: string;
//       vibrant?: string;
//       success?: string;
//       gradient?: {
//         primary?: string;
//         secondary?: string;
//         accent?: string;
//       };
//     };
//   }
// }

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#8b5cf6", // Royal Purple (matching login gradients)
//       light: "#a78bfa",
//       dark: "#7c3aed",
//       contrastText: "#ffffff",
//     },
//     secondary: {
//       main: "#06b6d4", // Vibrant Cyan (matching login gradients)
//       light: "#22d3ee",
//       dark: "#0891b2",
//       contrastText: "#ffffff",
//     },
//     background: {
//       default: "#fafbfc", // Keep light background
//       paper: "rgba(255, 255, 255, 0.98)", // Glassmorphism effect
//     },
//     text: {
//       primary: "#0f172a", // Rich Dark Navy
//       secondary: "#64748b", // Muted slate
//     },
//     custom: {
//       main: "#0f172a", // Rich Dark Navy
//       secondary: "#f59e0b", // Vibrant Gold
//       accent: "#8b5cf6", // Royal Purple
//       light: "#f8fafc",
//       vibrant: "#06b6d4", // Cyan
//       success: "#10b981", // Emerald
//       gradient: {
//         primary: "linear-gradient(135deg, #8b5cf6, #06b6d4)", // Purple to Cyan
//         secondary: "linear-gradient(135deg, #f59e0b, #ef4444)", // Gold to Red
//         accent: "linear-gradient(135deg, #8b5cf615, #06b6d410)", // Subtle gradient
//       },
//     },
//   },
//   typography: {
//     fontFamily: "'Inter', 'Playfair Display', serif",
//     h1: {
//       fontWeight: 900,
//       fontFamily: "'Playfair Display', serif",
//       background: "linear-gradient(135deg, #0f172a, #8b5cf6)",
//       WebkitBackgroundClip: "text",
//       WebkitTextFillColor: "transparent",
//       backgroundClip: "text",
//     },
//     h2: {
//       fontWeight: 800,
//       fontFamily: "'Playfair Display', serif",
//       background: "linear-gradient(135deg, #0f172a, #8b5cf6)",
//       WebkitBackgroundClip: "text",
//       WebkitTextFillColor: "transparent",
//       backgroundClip: "text",
//     },
//     h3: {
//       fontWeight: 700,
//       fontFamily: "'Playfair Display', serif",
//       color: "#0f172a",
//     },
//     h4: {
//       fontWeight: 700,
//       color: "#0f172a",
//     },
//     h5: {
//       fontWeight: 600,
//       color: "#0f172a",
//     },
//     h6: {
//       fontWeight: 600,
//       color: "#0f172a",
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: "none",
//           borderRadius: "20px", // Increased from 16px to match login
//           fontWeight: 800, // Increased to match login
//           boxShadow: "none",
//           padding: "16px 40px", // Increased padding
//           fontSize: "1.1rem", // Slightly larger
//           transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//           position: "relative",
//           overflow: "hidden",
//           background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
//           color: "white",
//           "&:hover": {
//             background: "linear-gradient(135deg, #7c3aed, #0891b2)",
//             transform: "translateY(-4px)",
//             boxShadow: "0 24px 60px rgba(139, 92, 246, 0.5)",
//           },
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: "-100%",
//             width: "100%",
//             height: "100%",
//             background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
//             transition: "left 0.6s",
//           },
//           "&:hover::before": {
//             left: "100%",
//           },
//         },
//         outlined: {
//           background: "transparent",
//           border: "2px solid rgba(139, 92, 246, 0.3)",
//           color: "#8b5cf6",
//           "&:hover": {
//             background: "rgba(139, 92, 246, 0.1)",
//             border: "2px solid #8b5cf6",
//             transform: "translateY(-2px)",
//             boxShadow: "0 12px 32px rgba(139, 92, 246, 0.2)",
//           },
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: "32px", // Increased to match login
//           overflow: "hidden",
//           background: "rgba(255, 255, 255, 0.98)", // Glassmorphism
//           backdropFilter: "blur(20px)",
//           border: "2px solid rgba(139, 92, 246, 0.2)", // Purple border
//           boxShadow: "0 24px 80px rgba(15, 23, 42, 0.15)", // Enhanced shadow
//           transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//           position: "relative",
//           "&:hover": {
//             transform: "translateY(-8px) scale(1.01)", // Reduced scale for subtlety
//             boxShadow: "0 32px 100px rgba(139, 92, 246, 0.25)",
//             border: "2px solid rgba(139, 92, 246, 0.4)",
//           },
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "16px",
//             background: "rgba(255, 255, 255, 0.8)",
//             backdropFilter: "blur(10px)",
//             transition: "all 0.3s ease",
//             "& fieldset": {
//               borderColor: "rgba(139, 92, 246, 0.2)",
//               borderWidth: "2px",
//             },
//             "&:hover fieldset": {
//               borderColor: "rgba(139, 92, 246, 0.4)",
//               boxShadow: "0 8px 24px rgba(139, 92, 246, 0.1)",
//             },
//             "&.Mui-focused fieldset": {
//               borderColor: "#8b5cf6",
//               boxShadow: "0 12px 32px rgba(139, 92, 246, 0.2)",
//             },
//           },
//           "& .MuiInputBase-input": {
//             fontSize: "1.1rem",
//             fontWeight: 600,
//             color: "#0f172a",
//             padding: "16px",
//           },
//         },
//       },
//     },
//     MuiChip: {
//       styleOverrides: {
//         root: {
//           background: "linear-gradient(135deg, #8b5cf620, #06b6d415)",
//           color: "#0f172a",
//           fontWeight: 700,
//           border: "2px solid rgba(139, 92, 246, 0.3)",
//           boxShadow: "0 8px 24px rgba(139, 92, 246, 0.15)",
//           borderRadius: "16px",
//           padding: "8px 16px",
//           fontSize: "0.9rem",
//         },
//       },
//     },
//     MuiAppBar: {
//       styleOverrides: {
//         root: {
//           background: "rgba(255, 255, 255, 0.95)",
//           backdropFilter: "blur(20px)",
//           boxShadow: "0 8px 40px rgba(15, 23, 42, 0.12)",
//           borderBottom: "1px solid rgba(139, 92, 246, 0.1)",
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           background: "rgba(255, 255, 255, 0.98)",
//           backdropFilter: "blur(20px)",
//           border: "1px solid rgba(139, 92, 246, 0.1)",
//           borderRadius: "24px",
//           boxShadow: "0 20px 60px rgba(15, 23, 42, 0.1)",
//         },
//       },
//     },
//     MuiDivider: {
//       styleOverrides: {
//         root: {
//           background: "linear-gradient(90deg, #8b5cf6, #06b6d4)",
//           height: "2px",
//           border: "none",
//         },
//       },
//     },
//   },
// });

// export default theme;