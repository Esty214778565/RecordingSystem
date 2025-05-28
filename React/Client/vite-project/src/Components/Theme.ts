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
      main: "#f59e0b", // Vibrant Gold
      light: "#fbbf24",
      dark: "#d97706",
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
      secondary: "#f59e0b", // Vibrant Gold
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