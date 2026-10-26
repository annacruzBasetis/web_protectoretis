import LockIcon from '@mui/icons-material/Lock'; 
import { Container, Typography, Button, Alert, Stack } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';  
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../services/useAuth';

const DashboardErrorPage = () => {
  const navigate = useNavigate();
 
  const {login, logout} = useAuth();
  const handleAdminGoogleLogin = async () => {
    // Netejar la sessió de Spring (si n'hi ha) abans de re-autenticar amb Google
    await fetch("http://localhost:8080/logout", {
      method: "GET",
      credentials: "include",
      redirect: "manual", // evitem que el navegador segueixi el redirect a localhost:5173
    }).catch(() => {/* ignorar errors si ja no hi ha sessió */});
    login();
  };

  return (
    <>
      <Header />
      <main>
        <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
          <LockIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          <Typography variant="h2" sx={{ mb: 2 }}>Accès Restringit</Typography>
          <Alert severity="warning" sx={{ mb: 4 }}>
            Es necesari iniciar sessió per accedir a la Zona d'Administrador. Nomès els administradors poden iniciar sessió.
          </Alert>

          <Stack direction="column" spacing={2} sx={{ maxWidth: '280px', mx: 'auto', mt: 3 }}>            
            <Button 
              variant="contained" 
              onClick={handleAdminGoogleLogin}
              sx={{
                backgroundColor: 'warning.main',
                color: 'text.primary',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'warning.dark',
                },
              }}
            >
              Soc Admin: Iniciar sessió
            </Button>
            <Button variant="contained" onClick={() => navigate('/')}>
              Tornar a l'inici
            </Button>
          </Stack>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default DashboardErrorPage;