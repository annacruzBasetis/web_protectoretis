import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import { useSearchParams, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // El token s'obté de la URL: /reset-password?token=...
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!token) {
      setErrorMessage("El token de recuperació no és vàlid o no s'ha trobat.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage('La contrasenya ha de tenir com a mínim 8 caràcters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Les contrasenyes no coincideixen.');
      return;
    }

    setLoading(true);

    try {
      // Quan connectem amb el backend Spring Boot:
      // const response = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token, newPassword }),
      // });
      // if (!response.ok) throw new Error('El token ha caducat o no és vàlid.');

      // Simulació d'actualització satisfactòria
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 800);
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || "Error al restablir la contrasenya.");
    }
  };

  return (
    <>
      <Header />
      <main>
        <Box sx={{ py: 4, textAlign: 'center', backgroundColor: 'primary.light', mb: 6 }}>
          <Typography variant="h1" color="text.primary" sx={{ fontSize: '2rem' }}>
            Restablir Contrasenya
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Introdueix la teva nova clau d'accés per actualitzar el teu compte
          </Typography>
        </Box>

        <Container maxWidth="xs" sx={{ pb: 12 }}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ p: 3 }}>
              {/* Token absent a la URL */}
              {!token && (
                <Stack spacing={2} sx={{ textAlign: 'center', py: 2 }}>
                  <Alert severity="error">
                    Enllaç no vàlid o caducat. Assegura't d'haver utilitzat l'enllaç complet del teu correu electrònic.
                  </Alert>
                  <Button variant="contained" onClick={() => navigate('/')}>
                    Tornar a l'inici
                  </Button>
                </Stack>
              )}

              {/* Cas d'èxit */}
              {token && success && (
                <Stack spacing={2.5} sx={{ textAlign: 'center', py: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60 }} />
                  </Box>
                  <Typography variant="h3" sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                    Contrasenya actualitzada!
                  </Typography>
                  <Alert severity="success">
                    La teva contrasenya s'ha restablert correctament. Ja pots iniciar sessió amb les teves noves credencials.
                  </Alert>
                  <Button variant="contained" onClick={() => navigate('/')}>
                    Anar a l'inici
                  </Button>
                </Stack>
              )}

              {/* Formulari actiu */}
              {token && !success && (
                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={2.5}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LockResetIcon color="primary" fontSize="large" />
                      <Typography variant="h3" sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                        Nova clau
                      </Typography>
                    </Box>

                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

                    <TextField
                      label="Nova contrasenya"
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      fullWidth
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      helperText="Com a mínim 8 caràcters"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="canviar visibilitat nova contrasenya"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              edge="end"
                            >
                              {showNewPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      label="Confirmar contrasenya"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      fullWidth
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="canviar visibilitat confirmar contrasenya"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : null}
                      sx={{ mt: 1 }}
                    >
                      {loading ? 'Actualitzant...' : 'Restablir contrasenya'}
                    </Button>
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default ResetPasswordPage;