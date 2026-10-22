import React, { useState, useEffect } from 'react';
import {Box, Container, Typography, Card, CardMedia, CardContent, CardActions, Button, Chip, Divider, CircularProgress, IconButton, Collapse,} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface AdoptAnimal {
  id: number;
  nom: string;
  descripcio?: string;
  dataNaixament?: string;
  ubicacio?: string;
  esterilitzat?: boolean;
  medicacio?: string;
  cronic?: boolean;
  fotos?: string[];
  fotoUrl?: string;
}

//Component per carrusel
const ImageCarousel = ({ fotos, nom }: { fotos: string[]; nom: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!fotos || fotos.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % fotos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + fotos.length) % fotos.length);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '220px' }}>
      <CardMedia
        component="img"
        height="220"
        image={fotos[currentIndex]}
        alt={`Foto de ${nom}`}
      />

      {fotos.length > 1 && (
        <>
          <IconButton
            size="small"
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 8,
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={handleNext}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 8,
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>

          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              gap: 0.5,
            }}
          >
            {fotos.map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: idx === currentIndex ? 'primary.main' : 'rgba(255, 255, 255, 0.6)',
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

//Component per a cada card.
const AnimalCard = ({ animal }: { animal: AdoptAnimal }) => {
  const [expanded, setExpanded] = useState(false);

  const edatText = (() => {
    if (!animal.dataNaixament) return null;
    const anyNaixament = new Date(animal.dataNaixament).getFullYear();
    const anyActual = new Date().getFullYear();
    const edat = anyActual - anyNaixament;
    if (edat <= 0) return "Menys d'1 any";
    return `${edat} ${edat === 1 ? 'any' : 'anys'}`;
  })();

  const llistaFotos = animal.fotos || (animal.fotoUrl ? [animal.fotoUrl] : []);
  const teDetallsDetallats = Boolean(animal.medicacio || animal.descripcio);

  return (
    <Box
      sx={{
        flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 30%' },
        maxWidth: { md: '360px' },
      }}
    >
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: 2 }}>
        {/*Nom */}
        <Box sx={{ p: 2, textAlign: 'center', backgroundColor: 'primary.main' }}>
          <Typography variant="h2" sx={{ fontSize: '1.8rem', color: 'text.primary' }}>
            {animal.nom}
          </Typography>
        </Box>

        {/*Carrusel */}
        <ImageCarousel fotos={llistaFotos} nom={animal.nom} />

        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flexGrow: 1 }}>
          {/*Edat */}
          {edatText && (
            <Typography variant="h3" sx={{ fontSize: '1.1rem', color: 'text.primary' }}>
              {edatText}
            </Typography>
          )}

          {/*Ubicació */}
          {animal.ubicacio && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
              <LocationOnIcon color="error" fontSize="small" />
              <Typography variant="body2">{animal.ubicacio}</Typography>
            </Box>
          )}

          {/* Esterilitzat i Crónic */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {animal.esterilitzat !== undefined && (
              <Chip
                label={animal.esterilitzat ? 'Esterilitzat/da' : 'No esterilitzat/da'}
                color={animal.esterilitzat ? 'success' : 'default'}
                size="small"
                variant="outlined"
              />
            )}

            {animal.cronic && (
              <Chip
                label="Crònic"
                color="warning"
                size="small"
                variant="outlined"
              />
            )}
          </Box>

          {/* Veure més / Veure menys" */}
          {teDetallsDetallats && (
            <Button
              size="small"
              onClick={() => setExpanded(!expanded)}
              endIcon={expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              sx={{ alignSelf: 'flex-start', p: 0, mt: 1, textTransform: 'none', color: 'text.secondary' }}
            >
              {expanded ? 'Veure menys' : 'Veure més informació'}
            </Button>
          )}

          {/* Desplegable amb el Collapse */}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {/* Medicació */}
              {animal.medicacio && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <MedicalServicesIcon color="primary" fontSize="small" sx={{ mt: 0.3 }} />
                  <Typography variant="body2" color="text.secondary">
                    <strong>Medicació:</strong> {animal.medicacio}
                  </Typography>
                </Box>
              )}

              {/*Descripció */}
              {animal.descripcio && (
                <Typography variant="body2" color="text.primary">
                  <strong>Descripció:</strong> {animal.descripcio}
                </Typography>
              )}
            </Box>
          </Collapse>
        </CardContent>

        {/* CTA "Vull informació" */}
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<InfoIcon />}
            sx={{
              backgroundColor: 'primary.main',
              color: 'text.primary',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            Vull informació
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

const AdoptPage = () => {
  const [animals, setAnimals] = useState<AdoptAnimal[]>([]);
  const [carregant, setCarregant] = useState(true);

  useEffect(() => {
    const dadesExemple: AdoptAnimal[] = [
      {
        id: 1,
        nom: 'Luna',
        fotos: [
          'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80',
        ],
        dataNaixament: '2021-05-14',
        ubicacio: 'Casa de acogida - Barcelona',
        esterilitzat: true,
        medicacio: 'Condroprotector articular diari',
        cronic: true,
        descripcio: 'Gossa molt juganera i afectuosa amb els nens. Li encanta córrer pel parc i socialitzar amb altres gossos. Necessita una família activa.',
      },
      {
        id: 2,
        nom: 'Dónut',
        fotos: [
          'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
        ],
        dataNaixament: '2019-11-02',
        ubicacio: 'Colonia Estación',
        esterilitzat: true,
        cronic: false,
        descripcio: 'Gata molt meula i meandrosa, li encanta dormir al sol tot el dia i demanar carícies.',
      },
      {
        id: 3,
        nom: 'Felix',
        fotos: [
          'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80',
        ],
        dataNaixament: '2023-01-20',
        ubicacio: 'Casa de acogida - Viladecans',
        esterilitzat: false,
        medicacio: 'Antibiòtic Amoxicilina (fins al 20/10)',
        cronic: false,
      },
    ];

    setAnimals(dadesExemple);
    setCarregant(false);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Box sx={{ py: 4, textAlign: 'center', backgroundColor: 'primary.light', mb: 6 }}>
          <Typography variant="h1" color="text.primary">
            Animals en Adopció
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Troba el teu nou amic i dóna-li una segona oportunitat
          </Typography>
        </Box>

        <Container maxWidth="lg" sx={{ pb: 10 }}>
          {carregant ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
              {animals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </Box>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default AdoptPage;