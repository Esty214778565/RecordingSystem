import { Outlet } from "react-router-dom";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { CssBaseline, Box } from "@mui/material";
import Header from "./Components/Header";
import theme from "./Components/Theme";

const AppLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: "100vw",
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
            pt: "64px", // התאמה לגובה ה-Header שלך (AppBar)
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AppLayout;
