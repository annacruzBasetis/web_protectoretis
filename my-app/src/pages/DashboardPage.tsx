import React, { useState } from 'react';
import {Box, Container, Typography, Card, CardActionArea, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControlLabel, Checkbox, Stack, DialogContentText, Chip, Autocomplete} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface AdminUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = true;

  // Listat d'administradors
  const [admins, setAdmins] = useState<AdminUser[]>([
    { id: 1, name: 'Admin General', email: 'admin@example.com', createdAt: '2024-01-15' },
    { id: 2, name: 'Carlos Blé', email: 'carlos@example.com', createdAt: '2024-02-01' },
    { id: 3, name: 'Ana Martínez', email: 'ana.martinez@example.com', createdAt: '2024-03-10' },
  ]);

  // Listat de vacunes
  const vacunasCatalogo = [
  'Rabia',
  'Polivalente canina (DHPPi)',
  'Trivalente felina',
  'Leucemia felina (FeLV)',
  'Mixomatosis',
];

  // Estats dels modals
  const [activeModal, setActiveModal] = useState<'adopt' | 'missing' | 'admin' | null>(null);

  // Esbrrat amb contrasenya
  const [adminToDelete, setAdminToDelete] = useState<AdminUser | null>(null);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Estats dels formularis 
  const [adoptData, setAdoptData] = useState({
    nom: '',
    dataNaixament: '',
    ubicacio: '',
    esterilitzat: false,
    cronic: false,
    medicacio: '',
    vacunes: [] as string[],
    descripcio: '',
    fotos: [] as File[],
  });

  const [missingData, setMissingData] = useState({
    nom: '',
    descripcio: '',
    zona: '',
    xip: false,
    telContacte1: '',
    telContacte2: '',
    mailContacte: '',
    fotos: [] as File[],
  });

  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
  });

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  // Maneig dels arxius de Adopta
  const handleAdoptImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setAdoptData({
        ...adoptData,
        fotos: [...adoptData.fotos, ...selectedFiles],
      });
    }
  };

  const handleRemoveAdoptImage = (index: number) => {
    const updatedFotos = adoptData.fotos.filter((_, i) => i !== index);
    setAdoptData({ ...adoptData, fotos: updatedFotos });
  };

  // Maneig dels arxius de Perdut
  const handleMissingImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setMissingData({
        ...missingData,
        fotos: [...missingData.fotos, ...selectedFiles],
      });
    }
  };

  const handleRemoveMissingImage = (index: number) => {
    const updatedFotos = missingData.fotos.filter((_, i) => i !== index);
    setMissingData({ ...missingData, fotos: updatedFotos });
  };

  // Accions d'esborrat d'admin
  const handleOpenDeleteDialog = (admin: AdminUser) => {
    setAdminToDelete(admin);
    setPasswordConfirm('');
    setPasswordError(false);
  };

  const handleCloseDeleteDialog = () => {
    setAdminToDelete(null);
    setPasswordConfirm('');
    setPasswordError(false);
  };

  const handleConfirmDeleteAdmin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordConfirm.trim()) {
      setPasswordError(true);
      return;
    }

    if (adminToDelete) {
      setAdmins(admins.filter((admin) => admin.id !== adminToDelete.id));
      handleCloseDeleteDialog();
    }
  };

  // Enviament de form
  const handleSubmitAdopt = (e: React.FormEvent) => {
    e.preventDefault();

    // Quan conectem amb Spring Boot, enviarem un FormData amb les imatges:
    // const formData = new FormData();
    // adoptData.fotos.forEach((foto) => formData.append('fotos', foto));
    console.log('Enviando adopción:', adoptData);

    setAdoptData({
      nom: '',
      dataNaixament: '',
      ubicacio: '',
      esterilitzat: false,
      cronic: false,
      medicacio: '',
      vacunes: [],
      descripcio: '',
      fotos: [],
    });
    handleCloseModal();
  };

  const handleSubmitMissing = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enviando perdido:', missingData);

    setMissingData({
      nom: '',
      descripcio: '',
      zona: '',
      xip: false,
      telContacte1: '',
      telContacte2: '',
      mailContacte: '',
      fotos: [],
    });
    handleCloseModal();
  };

  const handleSubmitAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const newAdmin: AdminUser = {
      id: Date.now(),
      name: adminData.name,
      email: adminData.email,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setAdmins([...admins, newAdmin]);
    setAdminData({ name: '', email: '' });
    handleCloseModal();
  };

  if (!isLoggedIn) {
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

  return (
    <>
      <Header />
      <main>
        <Box sx={{ py: 4, backgroundColor: 'primary.light', textAlign: 'center', mb: 6 }}>
          <Typography variant="h1" color="text.primary">Zona de Administrador</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Gestión interna de animales y usuarios administradores
          </Typography>
        </Box>

        <Container maxWidth="lg" sx={{ pb: 10 }}>
          {/* Cards botó */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', mb: 8 }}>
            
            {/* Adopció */}
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 30%' } }}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 2 }}>
                <CardActionArea onClick={() => setActiveModal('adopt')} sx={{ height: '100%', p: 3, textAlign: 'center' }}>
                  <CardContent>
                    <PetsIcon sx={{ fontSize: 70, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h3" sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                      Añadir Adopción
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Registra un nuevo animal disponible para adoptar
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>

            {/* Perdut */}
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 30%' } }}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 2 }}>
                <CardActionArea onClick={() => setActiveModal('missing')} sx={{ height: '100%', p: 3, textAlign: 'center' }}>
                  <CardContent>
                    <SearchIcon sx={{ fontSize: 70, color: 'secondary.main', mb: 2 }} />
                    <Typography variant="h3" sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                      Añadir Perdido
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Publica un anuncio de un animal extraviado
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>

            {/* Administrador */}
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 30%' } }}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 2 }}>
                <CardActionArea onClick={() => setActiveModal('admin')} sx={{ height: '100%', p: 3, textAlign: 'center' }}>
                  <CardContent>
                    <PersonAddIcon sx={{ fontSize: 70, color: 'primary.dark', mb: 2 }} />
                    <Typography variant="h3" sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                      Añadir Administrador
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Resistra a un nuevo administrador para que pueda añadir a animales en adopción, animales perdidos u otros administradores.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Box>

          {/* Taula d'Administradors */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h2" sx={{ mb: 3, fontSize: '1.8rem' }}>
              Administradores Actuales
            </Typography>

            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
              <Table sx={{ minWidth: 600 }}>
                <TableHead sx={{ backgroundColor: 'primary.main' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'text.primary', fontWeight: 'bold' }}>Nombre</TableCell>
                    <TableCell sx={{ color: 'text.primary', fontWeight: 'bold' }}>Correo electrónico</TableCell>
                    <TableCell sx={{ color: 'text.primary', fontWeight: 'bold' }}>Fecha de alta</TableCell>
                    <TableCell align="center" sx={{ color: 'text.primary', fontWeight: 'bold' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {admins.map((admin) => (
                    <TableRow key={admin.id} hover>
                      <TableCell>{admin.name}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>{admin.createdAt}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          onClick={() => handleOpenDeleteDialog(admin)}
                          title="Eliminar administrador"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>

        {/* Modal d'esborrat d'administrador */}
        <Dialog open={Boolean(adminToDelete)} onClose={handleCloseDeleteDialog} maxWidth="xs" fullWidth>
          <Box component="form" onSubmit={handleConfirmDeleteAdmin}>
            <DialogTitle sx={{ backgroundColor: 'error.main', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
              <WarningAmberIcon />
              ¿Eliminar administrador?
            </DialogTitle>
            <DialogContent sx={{ pt: 3 }}>
              <DialogContentText sx={{ mb: 2 }}>
                Estás a punto de eliminar a <strong>{adminToDelete?.name}</strong> ({adminToDelete?.email}). Esta acción no se puede deshacer.
              </DialogContentText>
              <TextField
                autoFocus
                label="Introduce tu contraseña para confirmar"
                type="password"
                fullWidth
                required
                value={passwordConfirm}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                  setPasswordError(false);
                }}
                error={passwordError}
                helperText={passwordError ? 'Debes introducir tu contraseña' : ''}
              />
            </DialogContent>
            <DialogActions sx={{ p: 2, pt: 0 }}>
              <Button onClick={handleCloseDeleteDialog} color="inherit">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="error">
                Eliminar
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        {/* ================================================================= */}
        {/* Modal afegir adopció */}
        {/* ================================================================= */}
        <Dialog open={activeModal === 'adopt'} onClose={handleCloseModal} maxWidth="sm" fullWidth>
          <Box component="form" onSubmit={handleSubmitAdopt}>
            <DialogTitle sx={{ backgroundColor: 'primary.main', color: 'text.primary', fontWeight: 'bold' }}>
              Añadir Mascota en Adopción
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2} sx={{ mt: 1 }}>
                <TextField
                  label="Nombre del animal"
                  required
                  fullWidth
                  value={adoptData.nom}
                  onChange={(e) => setAdoptData({ ...adoptData, nom: e.target.value })}
                />
                
                {/* Adjuntar fotos */}
                <Box>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                  >
                    Subir una o varias fotos
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleAdoptImageChange}
                    />
                  </Button>

                  {/* Listat d'imatges adjuntes */}
                  {adoptData.fotos.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
                      {adoptData.fotos.map((file, index) => (
                        <Chip
                          key={index}
                          label={file.name}
                          onDelete={() => handleRemoveAdoptImage(index)}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  )}
                </Box>

                <TextField
                  label="Fecha de nacimiento"
                  type="date"
                  slotProps={{ inputLabel: { shrink: true } as any }}
                  required
                  fullWidth
                  value={adoptData.dataNaixament}
                  onChange={(e) => setAdoptData({ ...adoptData, dataNaixament: e.target.value })}
                />
                <TextField
                  label="Ubicación (ej: Casa de acogida - Barcelona)"
                  fullWidth
                  value={adoptData.ubicacio}
                  onChange={(e) => setAdoptData({ ...adoptData, ubicacio: e.target.value })}
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={adoptData.esterilitzat}
                        onChange={(e) => setAdoptData({ ...adoptData, esterilitzat: e.target.checked })}
                      />
                    }
                    label="Esterilizado/a"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={adoptData.cronic}
                        onChange={(e) => setAdoptData({ ...adoptData, cronic: e.target.checked })}
                      />
                    }
                    label="Tratamiento Crónico"
                  />
                </Box>
                <TextField
                  label="Medicación"
                  fullWidth
                  value={adoptData.medicacio}
                  onChange={(e) => setAdoptData({ ...adoptData, medicacio: e.target.value })}
                />
                {/* Desplegable de Vacunas (Selección + Texto libre) */}
                <Autocomplete
                  multiple
                  freeSolo
                  options={vacunasCatalogo}
                  value={adoptData.vacunes}
                  onChange={(_, newValue) => {
                  setAdoptData({ ...adoptData, vacunes: newValue as string[] });
                    }}
                  renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Vacunas"
                    placeholder="Selecciona o escribe una nueva y pulsa Enter"
                      />
                    )}
                  />
                <TextField
                  label="Descripción"
                  multiline
                  rows={3}
                  fullWidth
                  value={adoptData.descripcio}
                  onChange={(e) => setAdoptData({ ...adoptData, descripcio: e.target.value })}
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseModal} color="inherit">Cancelar</Button>
              <Button type="submit" variant="contained">Guardar Adopción</Button>
            </DialogActions>
          </Box>
        </Dialog>

        {/* ================================================================= */}
        {/* Modal afegir animal perdut */}
        {/* ================================================================= */}
        <Dialog open={activeModal === 'missing'} onClose={handleCloseModal} maxWidth="sm" fullWidth>
          <Box component="form" onSubmit={handleSubmitMissing}>
            <DialogTitle sx={{ backgroundColor: 'secondary.main', color: 'white', fontWeight: 'bold' }}>
              Añadir Animal Perdido
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2} sx={{ mt: 1 }}>
                <TextField
                  label="Nombre del animal"
                  required
                  fullWidth
                  value={missingData.nom}
                  onChange={(e) => setMissingData({ ...missingData, nom: e.target.value })}
                />

                {/* Adjuntar fotos */}
                <Box>
                  <Button
                    variant="outlined"
                    color="secondary" //TODO: el color es massa clar
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                  >
                    Subir una o varias fotos
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleMissingImageChange}
                    />
                  </Button>

                  {/* Listat d'imatges adjuntes */}
                  {missingData.fotos.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
                      {missingData.fotos.map((file, index) => (
                        <Chip
                          key={index}
                          label={file.name}
                          onDelete={() => handleRemoveMissingImage(index)}
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  )}
                </Box>

                <TextField
                  label="Descripción"
                  multiline
                  rows={3}
                  required
                  fullWidth
                  value={missingData.descripcio}
                  onChange={(e) => setMissingData({ ...missingData, descripcio: e.target.value })}
                />
                <TextField
                  label="Zona en la que se ha perdido"
                  required
                  fullWidth
                  value={missingData.zona}
                  onChange={(e) => setMissingData({ ...missingData, zona: e.target.value })}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={missingData.xip}
                      onChange={(e) => setMissingData({ ...missingData, xip: e.target.checked })}
                    />
                  }
                  label="¿Tiene microchip?"
                />
                <TextField
                  label="Teléfono de contacto 1"
                  required
                  fullWidth
                  value={missingData.telContacte1}
                  onChange={(e) => setMissingData({ ...missingData, telContacte1: e.target.value })}
                />
                <TextField
                  label="Teléfono de contacto 2 (opcional)"
                  fullWidth
                  value={missingData.telContacte2}
                  onChange={(e) => setMissingData({ ...missingData, telContacte2: e.target.value })}
                />
                <TextField
                  label="Correo electrónico de contacto"
                  type="email"
                  required
                  fullWidth
                  value={missingData.mailContacte}
                  onChange={(e) => setMissingData({ ...missingData, mailContacte: e.target.value })}
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseModal} color="inherit">Cancelar</Button>
              <Button type="submit" variant="contained" color="secondary">Guardar Perdido</Button>
            </DialogActions>
          </Box>
        </Dialog>

        {/* Modal afegir Admin */}
        <Dialog open={activeModal === 'admin'} onClose={handleCloseModal} maxWidth="xs" fullWidth>
          <Box component="form" onSubmit={handleSubmitAdmin}>
            <DialogTitle sx={{ backgroundColor: 'primary.dark', color: 'white', fontWeight: 'bold' }}>
              Añadir Administrador
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2} sx={{ mt: 1 }}>
                <TextField
                  label="Nombre completo"
                  required
                  fullWidth
                  value={adminData.name}
                  onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                />
                <TextField
                  label="Correo electrónico"
                  type="email"
                  required
                  fullWidth
                  value={adminData.email}
                  onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseModal} color="inherit">Cancelar</Button>
              <Button type="submit" variant="contained">Dar de alta</Button>
            </DialogActions>
          </Box>
        </Dialog>

      </main>
      <Footer />
    </>
  );
};

export default DashboardPage;