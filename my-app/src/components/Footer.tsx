import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        
        bottom: 0,
        left: "50%",
        transform: "translateX(0%)", // Centra el footer en la pantalla
        width: "100%",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        py: 2,
        px: 3,
        borderRadius: "1rem 1rem 0 0", // Esquinas redondeadas arriba si te gusta el estilo
        boxShadow: 3,
        zIndex: 1000,
      }}
    >
      <Container maxWidth={false}>
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Proaniplan. Todos los derechos
          reservados.
        </Typography>
      </Container>
    </Box>
  );
}
