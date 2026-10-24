import LockIcon from '@mui/icons-material/Lock'; 
import { Container, Typography, Button, Alert } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';  
import { useNavigate } from 'react-router-dom';


const DashboardErrorPage = () => {
    const navigate = useNavigate();

    return (
      <>
        <Header />
        <main>
          <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
            <LockIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
            <Typography variant="h2" sx={{ mb: 2 }}>Acceso Restringido</Typography>
            <Alert severity="warning" sx={{ mb: 4 }}>
              Debes iniciar sesión para acceder a la Zona de Administrador. Solo los administradores pueden iniciar sesión.
            </Alert>
            <Button variant="contained" onClick={() => navigate('/')}>Volver al inicio</Button>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

export default DashboardErrorPage;