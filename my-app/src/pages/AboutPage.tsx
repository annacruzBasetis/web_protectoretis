import { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import Header from '../components/Header';
import Footer from '../components/Footer';

//Counter
const CounterItem = ({ 
  label, 
  targetNumber, 
  showPlus = false 
}: { 
  label: string; 
  targetNumber: number; 
  showPlus?: boolean 
}) => {
  const [count, setCount] = useState(0);

  //El counter incrementa més rápid contra més alt es el valor.
  useEffect(() => {
    const step = Math.max(1, Math.floor(targetNumber / 50));

    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount + step < targetNumber) {
          return prevCount + step;
        } else {
          clearInterval(timer);
          return targetNumber;
        }
      });
    }, 20);

    return () => clearInterval(timer);
  }, [targetNumber]);

  return (
    <Box sx={{ textAlign: 'center', p: 2, flex: '1 1 150px' }}>
      <Typography variant="h2" color="text.primary">
        {showPlus ? `+${count}` : count}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
};

const AboutPage = () => {
  const casesAcollida = 45;
  const animalsAdoptats = 320;
  const voluntaris = 20;
  const teamers = 111;

  return (
    <>
      <Header />
      <main>
        {/* Capçalera amb png de fons */}
        <Box
          sx={{
            height: '300px',
            backgroundImage: 'url(/Nosaltres.png)', //TODO: asignar imatge
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h1" sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.4)', p: 2, borderRadius: 2 }}>
            Nosaltres
          </Typography>
        </Box>

        <Container sx={{ py: 5 }}>
          <Box sx={{ mb: 5, textAlign: 'center' }}>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Box>

         {/*Secció de Contadors*/}
          <Box
            sx={{
              backgroundColor: 'white',
              p: 3,
              borderRadius: 2,
              boxShadow: 1,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              mb: 6,
            }}
          >
            <CounterItem label="Casas de acogida" targetNumber={casesAcollida} />
            <CounterItem label="Animales adoptados" targetNumber={animalsAdoptats} />
            <CounterItem label="Voluntarios" targetNumber= {voluntaris} showPlus={true}/>
            <CounterItem label="Teamers" targetNumber={teamers} />
          </Box>

          {/*Cards amb Box de Flexbox per diseny responsive*/}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              mb: 6,
            }}
          >
            {/*Card 1*/}
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 20%' } }}>
              <Card sx={{ backgroundColor: 'primary.light', textAlign: 'center', p: 2, height: '100%' }}>
                <PetsIcon sx={{ fontSize: 60, color: 'text.primary' }} />
                <CardContent>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    Rescate
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/*Card 2*/}
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 20%' } }}>
              <Card sx={{ backgroundColor: 'secondary.main', textAlign: 'center', p: 2, height: '100%' }}>
                <PetsIcon sx={{ fontSize: 60, color: 'text.primary' }} />
                <CardContent>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    Adopciones
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/*Card 3*/}
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 20%' } }}>
              <Card sx={{ backgroundColor: 'primary.main', textAlign: 'center', p: 2, height: '100%' }}>
                <PetsIcon sx={{ fontSize: 60, color: 'text.primary' }} />
                <CardContent>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    Gestión de colonias
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/*Card 4*/}
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 20%' } }}>
              <Card sx={{ backgroundColor: 'secondary.dark', textAlign: 'center', p: 2, height: '100%' }}>
                <PetsIcon sx={{ fontSize: 60, color: 'text.primary' }} />
                <CardContent>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    Concienciación
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>

        </Container>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;