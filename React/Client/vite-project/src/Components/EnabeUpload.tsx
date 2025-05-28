import React from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";


const EnableUpload: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <>
            {typeof window !== "undefined" && sessionStorage.getItem("role") === "teacher" && (
                <Button
                    variant="outlined"
                    size="large"
                    className="hero-cta-secondary"
                    sx={{
                        borderColor: theme.palette.custom.secondary,
                        color: theme.palette.custom.secondary,
                        borderWidth: 3,
                        px: 6,
                        py: 2.5,
                        fontSize: "1.2rem",
                        fontWeight: 800,
                        borderRadius: "20px",
                        "&:hover": {
                            backgroundColor: theme.palette.custom.secondary,
                            color: "white",
                            transform: "translateY(-4px)",
                            boxShadow: "0 20px 60px rgba(245, 158, 11, 0.4)",
                        },
                    }}
                    onClick={() => navigate("/add-lesson")}
                >
                    <PlusCircle style={{ marginRight: "12px", fontSize: "24px" }} />
                    Create Masterpiece
                </Button>
            )}
        </>
    );
};

export default EnableUpload;