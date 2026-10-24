import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider,
  CircularProgress,
  IconButton,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
} from '@mui/material';
import {
  LocationOn as LocationOnIcon,
  MedicalServices as MedicalServicesIcon,
  Vaccines as VaccinesIcon,
  Info as InfoIcon,
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Edit as EditIcon,
  DeleteOutlineRounded as DeleteOutlineRoundedIcon,
  CheckCircleOutlined as CheckCircleOutlinedIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
} from '@mui/icons-material';

import { AdoptFormModal, type AdoptAnimal } from '../components/AdoptFormModal';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
interface AnimalCardProps {
  animal: AdoptAnimal;
  isLoggedIn: boolean;
  onEdit: (animal: AdoptAnimal) => void;
  onDelete: (id: number) => void;
  onToggleAdoptat: (id: number) => void;
}

const AnimalCard = ({
  animal,
  isLoggedIn,
  onEdit,
  onDelete,
  onToggleAdoptat,
}: AnimalCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const edatText = (() => {
    if (!animal.dataNaixament) return null;
    const anyNaixament = new Date(animal.dataNaixament).getFullYear();
    const anyActual = new Date().getFullYear();
    const edat = anyActual - anyNaixament;
    if (edat <= 0) return "Menys d'1 any"; //TODO: adaptar per mostrar mesos
    return `${edat} ${edat === 1 ? 'any' : 'anys'}`;
  })();

  const llistaFotos = animal.fotos || (animal.fotoUrl ? [animal.fotoUrl] : []);
  const teDetallsDetallats = Boolean(animal.medicacio || animal.vacunes || animal.descripcio);

  return (
    <Box
      sx={{
        flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 30%' },
        maxWidth: { md: '360px' },
        position: 'relative',
      }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          boxShadow: 2,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Capa transllúcida per "Adoptat!" */}
        {animal.adoptat && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: '#ffeb3b',
                fontWeight: 900,
                letterSpacing: 3,
                textTransform: 'uppercase',
                transform: 'rotate(-20deg)',
                border: '4px solid #ffeb3b',
                px: 3,
                py: 1,
                borderRadius: 2,
                boxShadow: 4,
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            >
              ADOPTAT!
            </Typography>
          </Box>
        )}

        {/* Capçalera de card */}
        <Box
          sx={{
            p: 1.5,
            px: 2,
            backgroundColor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 6,
          }}
        >
          {/*Nom */}
          <Typography
            variant="h2"
            sx={{
              fontSize: '1.6rem',
              color: 'text.primary',
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {animal.nom}
          </Typography>

          {isLoggedIn && ( //Nomès els usuaris logejats poden veure els botons
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Tooltip title={animal.adoptat ? 'Desmarcar com adoptat' : 'Marcar com adoptat'}>
                <IconButton
                  size="small"
                  onClick={() => onToggleAdoptat(animal.id!)}
                  sx={{ color: animal.adoptat ? 'success.dark' : 'text.primary' }}
                >
                  {animal.adoptat ? <CheckCircleIcon fontSize="small" /> : <CheckCircleOutlinedIcon fontSize="small" />}
                </IconButton>
              </Tooltip>

              <Tooltip title="Editar animal">
                <IconButton size="small" onClick={() => onEdit(animal)} sx={{ color: 'text.primary' }}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Eliminar animal">
                <IconButton size="small" onClick={() => onDelete(animal.id!)} sx={{ color: 'error.main' }}>
                  <DeleteOutlineRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
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

              {/* Vacunes */}
              {animal.vacunes && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <VaccinesIcon color="info" fontSize="small" sx={{ mt: 0.3 }} />
                  <Typography variant="body2" color="text.secondary">
                    <strong>Vacunes:</strong> {animal.vacunes}
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
        <CardActions sx={{ p: 2, pt: 0, zIndex: 6 }}>
          <Button
            variant="contained"
            fullWidth
            disabled={animal.adoptat}
            startIcon={<InfoIcon />}
            sx={{
              backgroundColor: 'primary.main',
              color: 'text.primary',
              fontWeight: 'bold',
              ...(animal.adoptat && {
                textDecoration: 'line-through',
                opacity: 0.7,
              }),
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

  // Estat d'autenticació 
  // TODO: canviar segons el auth hook
  const [isLoggedIn] = useState(true);

  // Diàlegs
  const [animalAEliminar, setAnimalAEliminar] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<AdoptAnimal | null>(null);

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
        vacunes: 'Ràbia, Tetravalent (al dia)',
        cronic: true,
        adoptat: false,
        descripcio:
          'Gossa molt juganera i afectuosa amb els nens. Li encanta córrer pel parc i socialitzar amb altres gossos. Necessita una família activa.',
      },
      {
        id: 2,
        nom: 'Dónut',
        fotos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80'],
        dataNaixament: '2019-11-02',
        ubicacio: 'Colonia Estación',
        esterilitzat: true,
        vacunes: 'Trivalent felina, Leucèmia',
        cronic: false,
        adoptat: true,
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
        vacunes: 'Primer cicle de cadell completat',
        cronic: false,
        adoptat: false,
      },
    ];

    setAnimals(dadesExemple);
    setCarregant(false);
  }, []);

  // Handlers
  // Adopció
  const handleToggleAdoptat = (id: number) => {
    setAnimals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, adoptat: !a.adoptat } : a))
    );
  };

  // Confirmar eliminació
  const handleConfirmDelete = () => {
    if (animalAEliminar !== null) {
      setAnimals((prev) => prev.filter((a) => a.id !== animalAEliminar));
      setAnimalAEliminar(null);
    }
  };

  // Modal d'edició / creació
  const handleOpenCreate = () => {
    setEditingAnimal(null); // Modo crear
    setIsModalOpen(true);
  };

  const handleOpenEdit = (animal: AdoptAnimal) => {
    setEditingAnimal(animal); // Modo editar
    setIsModalOpen(true);
  };

  // Handler unificat per Crear o Editar
  const handleSaveAnimal = (formData: any) => {
    if (formData.id) {
      // Editar
      setAnimals((prev) =>
        prev.map((item) => (item.id === formData.id ? { ...item, ...formData } : item))
      );
    } else {
      // Crear nou
      const nouAnimal: AdoptAnimal = {
        ...formData,
        id: Date.now(),
        adoptat: false,
      };
      setAnimals((prev) => [nouAnimal, ...prev]);
    }
  };

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
          {isLoggedIn && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>
                Añadir nueva mascota
              </Button>
            </Box>
          )}

          {carregant ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
              {animals.map((animal) => (
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                  isLoggedIn={isLoggedIn}
                  onEdit={handleOpenEdit}
                  onDelete={(id) => setAnimalAEliminar(id)}
                  onToggleAdoptat={handleToggleAdoptat}
                />
              ))}
            </Box>
          )}
        </Container>
      </main>
      <Footer />

      {/* Modal d'Alerta per Eliminar */}
      <Dialog open={animalAEliminar !== null} onClose={() => setAnimalAEliminar(null)}>
        <DialogTitle>Eliminar animal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Estàs segur que vols eliminar aquest animal de la llista d'adopcions? Aquesta acció no es pot desfer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAnimalAEliminar(null)}>No eliminar</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal centralitzat per Crear / Editar */}
      <AdoptFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveAnimal}
        initialData={editingAnimal}
      />
    </>
  );
};

export default AdoptPage;