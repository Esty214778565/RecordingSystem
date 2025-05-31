// import { useNavigate } from "react-router-dom";
// import {
//     AppBar,
//     Toolbar,
//     Typography,
//     Box,
//     Button,
// } from "@mui/material";
// import { LogIn, Play } from "lucide-react";
// import { useTheme } from "@mui/material/styles";
// import EnableUpload from "./EnabeUpload";

// export default function Header() {
//     const navigate = useNavigate();
//     const theme = useTheme();

//     return (
//         <AppBar
//             position="fixed"
//             sx={{
//                 backgroundColor: "rgba(255,255,255,0.95)",
//                 backdropFilter: "blur(20px)",
//                 width: "100%",
//                 borderBottom: "1px solid rgba(245, 158, 11, 0.1)",
//             }}
//             className="app-bar"
//         >
//             <Toolbar sx={{ maxWidth: "1400px", width: "100%", margin: "0 auto", px: { xs: 2, md: 4 } }}>
//                 <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
//                     <Box
//                         sx={{
//                             width: 48,
//                             height: 48,
//                             borderRadius: "16px",
//                             background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.accent})`,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             mr: 2,
//                             boxShadow: "0 12px 32px rgba(15, 23, 42, 0.3)",
//                             position: "relative",
//                             "&::before": {
//                                 content: '""',
//                                 position: "absolute",
//                                 inset: "-2px",
//                                 background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
//                                 borderRadius: "18px",
//                                 zIndex: -1,
//                                 opacity: 0.7,
//                             },
//                         }}
//                         className="logo-pulse"
//                     >
//                         <Play style={{ color: "white", fontSize: "28px" }} />
//                     </Box>
//                     <Box>
//                         <Typography
//                             variant="h4"
//                             className="logo gradient-text"
//                             sx={{
//                                 fontWeight: 900,
//                                 fontFamily: "'Playfair Display', serif",
//                                 fontSize: "1.8rem",
//                                 background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.secondary})`,
//                                 WebkitBackgroundClip: "text",
//                                 WebkitTextFillColor: "transparent",
//                                 backgroundClip: "text",
//                             }}
//                         >
//                             Learnix
//                         </Typography>
//                         <Typography
//                             variant="caption"
//                             sx={{
//                                 color: theme.palette.custom.accent,
//                                 fontSize: "0.7rem",
//                                 letterSpacing: 1.5,
//                                 textTransform: "uppercase",
//                                 fontWeight: 600,
//                                 display: "block",
//                                 lineHeight: 1,
//                             }}
//                         >
//                             Educational Excellence
//                         </Typography>
//                     </Box>
//                 </Box>

//                 {typeof sessionStorage !== "undefined" && sessionStorage.userId !== undefined && (
//                     <>
//                         <Button
//                             variant="contained"
//                             sx={{
//                                 mx: 2,
//                                 background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.secondary})`,
//                                 fontWeight: 700,
//                                 "&:hover": {
//                                     background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
//                                 },
//                             }}
//                             onClick={() => navigate("/")}
//                         >
//                             Home
//                         </Button>
//                         <Button
//                             variant="contained"
//                             sx={{
//                                 mx: 2,
//                                 background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.secondary})`,
//                                 fontWeight: 700,
//                                 "&:hover": {
//                                     background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
//                                 },
//                             }}
//                             onClick={() => navigate("/courses")}
//                         >
//                             Courses
//                         </Button>
//                         <Button
//                             variant="contained"
//                             sx={{
//                                 mx: 2,
//                                 background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.secondary})`,
//                                 fontWeight: 700,
//                                 "&:hover": {
//                                     background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
//                                 },
//                             }}
//                             onClick={() => {
//                                 sessionStorage.clear()
//                                 navigate("/")
//                             }}
//                         >
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                                 <LogIn style={{ fontSize: "20px" }} />
//                                 <Typography variant="body1" sx={{ fontWeight: 800 }}>
//                                     Logout
//                                 </Typography>
//                             </Box>
//                         </Button>
//                     </>
//                 )}

//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     <EnableUpload />
//                     {typeof sessionStorage !== "undefined" && sessionStorage.userId === undefined && (
//                         <>
//                             <Button
//                                 variant="contained"
//                                 className="button-vibrant"
//                                 sx={{
//                                     background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
//                                     fontWeight: 700,
//                                     "&:hover": {
//                                         background: `linear-gradient(135deg, ${theme.palette.custom.vibrant}, ${theme.palette.custom.accent})`,
//                                         transform: "translateY(-3px)",
//                                         boxShadow: "0 12px 32px rgba(245, 158, 11, 0.4)",
//                                     },
//                                 }}
//                                 onClick={() => navigate("/register")}
//                             >
//                                 Get Started
//                             </Button>
//                             <Button
//                                 variant="outlined"
//                                 sx={{
//                                     fontWeight: 700,
//                                     ml: 1,
//                                     borderColor: theme.palette.custom.accent,
//                                     color: theme.palette.custom.accent,
//                                     "&:hover": {
//                                         background: theme.palette.custom.accent,
//                                         color: "#fff",
//                                     },
//                                 }}
//                                 onClick={() => navigate("/login")}
//                             >
//                                 Login
//                             </Button>
//                         </>
//                     )}
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     );
// }


import { useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
} from "@mui/material";
import { LogIn, Play, PlusCircle } from "lucide-react";
import { useTheme } from "@mui/material/styles";

import "./Register.css";

export default function Header() {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <AppBar
            position="fixed"
            className="register-gradient-bar"
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(20px)",
                width: "100%",
                borderBottom: "1px solid rgba(139, 92, 246, 0.2)",
                boxShadow: "0 12px 32px rgba(139, 92, 246, 0.08)",
                zIndex: 1000,
            }}
        >
            <Toolbar
                sx={{
                    maxWidth: "1400px",
                    width: "100%",
                    margin: "0 auto",
                    px: { xs: 2, md: 4 },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {/* Logo Section */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                        className="register-icon-pulse"
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: "16px",
                            background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.accent})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 20px 50px rgba(139, 92, 246, 0.4)",
                            position: "relative",
                        }}
                    >
                        <Play style={{ color: "white", fontSize: "28px" }} />
                    </Box>
                    <Box>
                        <Typography
                            variant="h4"
                            className="register-title-shimmer"
                            sx={{
                                fontWeight: 900,
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "1.8rem",
                                background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.secondary})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                backgroundSize: "200% auto",
                            }}
                        >
                            Learnix
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: theme.palette.custom.accent,
                                fontSize: "0.7rem",
                                letterSpacing: 1.5,
                                textTransform: "uppercase",
                                fontWeight: 600,
                                display: "block",
                                lineHeight: 1,
                            }}
                        >
                            Educational Excellence
                        </Typography>
                    </Box>
                </Box>

                {/* Navigation & Auth */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {/* <EnableUpload /> */}

                    {typeof sessionStorage !== "undefined" && sessionStorage.userId !== undefined ? (
                        <>
                            <Button
                                variant="contained"
                                className="register-submit-button"
                                sx={{
                                    px: 3,
                                    py: 1.2,
                                    borderRadius: "12px",
                                    background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.secondary})`,
                                    fontWeight: 700,
                                    "&:hover": {
                                        background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                                        transform: "translateY(-2px)",
                                    },
                                }}
                                onClick={() => navigate("/")}
                            >
                                Home
                            </Button>

                            <Button
                                variant="text"
                                className="register-nav-link"
                                sx={{
                                    px: 2,
                                    py: 1.2,
                                    minWidth: "unset",
                                    borderRadius: 0,
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    color: theme.palette.custom.main,
                                    background: "none",
                                    boxShadow: "none",
                                    textTransform: "none",
                                    position: "relative",
                                    border: "none",
                                    "&:hover": {
                                        background: "none",
                                        color: theme.palette.custom.secondary,
                                        border: "none",
                                        "&::after": {
                                            opacity: 1,
                                        },
                                    },
                                    "&::after": {
                                        content: '""',
                                        display: "block",
                                        width: "100%",
                                        height: "2px",
                                        background: theme.palette.custom.secondary,
                                        position: "absolute",
                                        left: 0,
                                        bottom: 0,
                                        opacity: 0,
                                        transition: "opacity 0.2s",
                                    },
                                }}
                                onClick={() => navigate("/courses")}
                            >
                                Courses
                            </Button>

                            {/* ✅ Create Masterpiece Button (Only One) */}
                            <Button
                                variant="outlined"
                                className="register-submit-button"
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: "20px",
                                    fontWeight: 800,
                                    fontSize: "1.05rem",
                                    display: "flex",
                                    alignItems: "center",
                                    border: `2px solid ${theme.palette.custom.vibrant}`,
                                    color: theme.palette.custom.vibrant,
                                    backgroundColor: "white",
                                    whiteSpace: "nowrap",
                                    "& svg": {
                                        marginRight: 1,
                                    },
                                    "&:hover": {
                                        background: theme.palette.custom.vibrant,
                                        color: "#fff",
                                        transform: "translateY(-2px)",
                                    },
                                }}
                                onClick={() => navigate("/add-lesson")}
                            >
                                <PlusCircle size={20} />
                                Create Masterpiece
                            </Button>


                            <Button
                                variant="outlined"
                                className="register-submit-button"
                                // sx={{
                                //     px: 3,
                                //     py: 1.2,
                                //     borderRadius: "12px",

                                //     background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.secondary})`,
                                //     fontWeight: 700,
                                //     "&:hover": {
                                //         background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                                //         transform: "translateY(-2px)",
                                //     },
                                // }}
                                sx={{
                                    px: 3,
                                    py: 1.2,
                                    borderRadius: "12px",
                                    fontWeight: 700,
                                    borderColor: theme.palette.custom.accent,
                                    color: theme.palette.custom.accent,
                                    "&:hover": {
                                        // background: theme.palette.custom.vibrant,
                                        background: theme.palette.custom.accent,
                                        color: "#fff",
                                    },
                                }}
                                onClick={() => {
                                    sessionStorage.clear();
                                    navigate("/");
                                }}
                            >
                                <Box
                                    sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                                    <LogIn style={{ fontSize: "20px" }} />
                                    <Typography variant="body1"
                                        sx={{ fontWeight: 800 }}>
                                        Logout
                                    </Typography>
                                </Box>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                className="register-submit-button"
                                sx={{
                                    px: 3,
                                    py: 1.2,
                                    borderRadius: "12px",
                                    background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                                    fontWeight: 700,
                                    "&:hover": {
                                        // background: `linear-gradient(135deg, ${theme.palette.custom.vibrant}, ${theme.palette.custom.accent})`,
                                        // transform: "translateY(-3px)",
                                        background: theme.palette.custom.accent,
                                        color: "#fff",
                                    },
                                }}
                                onClick={() => navigate("/register")}
                            >
                                Get Started
                            </Button>
                            <Button
                                variant="outlined"
                                className="register-submit-button"
                                sx={{
                                    px: 3,
                                    py: 1.2,
                                    borderRadius: "12px",
                                    fontWeight: 700,
                                    borderColor: theme.palette.custom.accent,
                                    color: theme.palette.custom.accent,
                                    "&:hover": {
                                        // background: theme.palette.custom.vibrant,
                                        background: theme.palette.custom.accent,
                                        color: "#fff",
                                    },
                                }}
                                onClick={() => navigate("/login")}
                            >
                                Sign In
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
