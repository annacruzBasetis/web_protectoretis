import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Stack,
  DialogContentText,
  Chip,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import {Box, Container, Typography, Card, CardActionArea, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControlLabel, Checkbox, Stack, DialogContentText, Chip, Autocomplete} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AdoptFormModal, type AdoptAnimal } from '../components/AdoptFormModal';
import { useAuth } from '../services/useAuth'
import { userService } from '../services/userService';
import DashboardErrorPage from './DashboardErrorPage';


interface AdminUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}
 
const DashboardPage = () => {

  const [admins, setAdmins] = useState<AdminUser[]>([]);
 
  const { getAll, create, deleteUser } = userService();

  const callAllUsers = async () => {
    try {
      const data = await getAll();
      setAdmins(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {callAllUsers()},[])


  // Estats dels modals
  const [activeModal, setActiveModal] = useState<'adopt' | 'missing' | 'admin' | null>(null);

  // Esbrrat amb contrasenya
  const [adminToDelete, setAdminToDelete] = useState<AdminUser | null>(null);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Estats dels formularis 
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
      deleteUser(adminToDelete.id);
      setAdmins(admins.filter((admin) => admin.id !== adminToDelete.id));
     
      console.log(adminToDelete.id);

      handleCloseDeleteDialog();
    }
  };

  // Enviament de form
  const handleSubmitAdopt = (formData: Omit<AdoptAnimal, 'id'> & { id?: number }) => {
    // Quan conectem amb Spring Boot, enviarem un FormData amb les dades i imatges
    console.log('Enviando adopción centralizada:', formData);
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

  const handleSubmitAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    
      const createdUser: AdminUser = await create({
        name: adminData.name,
        email: adminData.email,
      });

      setAdmins((prevAdmins) => [...(prevAdmins || []), createdUser]);

      setAdminData({ name: '', email: '' });
      handleCloseModal();

    } catch (error) {

      console.error("Error al registrar el administrador:", error);
      alert("No se pudo invitar al administrador. Revisa si el email ya existe o tu sesión ha expirado.");
    
    }
  };



  const { user, loading } = useAuth();

  if (loading) {
    return <p>Comprobando sesión...</p>;
  }

  if (!user) {
    return (
      <>
        <DashboardErrorPage/>
      </>
    )
  }

  

  return (
    <>
      <Header/>
    
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
        {/* Modal afegir adopció (Centralitzat amb AdoptFormModal)              */}
        {/* ================================================================= */}
        <AdoptFormModal
          open={activeModal === 'adopt'}
          onClose={handleCloseModal}
          onSubmit={handleSubmitAdopt}
          initialData={null}
        />

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