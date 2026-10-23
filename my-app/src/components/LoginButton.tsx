import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export const LoginButton = () => {
  const handleGoogleLogin = () => {
    // Redirige al navegador directamente al backend de Spring Boot
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={handleGoogleLogin}
      sx={{ backgroundColor: "#4285F4", color: "#fff" }}
    >
      Iniciar sesió amb Google
    </Button>
  );
};