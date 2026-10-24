import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Stack,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: (userData: { email: string }) => void;
  onForgotPasswordClick?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
  onLoginSuccess,
  onForgotPasswordClick,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setErrorMsg('');
    setLoading(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      // Quan connectem amb el backend Spring Boot:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!response.ok) throw new Error('Credencials incorrectes');

      // Simulació d'inici de sessió
      setTimeout(() => {
        setLoading(false);
        if (onLoginSuccess) {
          onLoginSuccess({ email });
        }
        handleClose();
      }, 700);
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || "Error a l'iniciar sessió");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            backgroundColor: 'primary.main',
            color: 'text.primary',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <LockOutlinedIcon />
          Iniciar Sessió
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

            <TextField
              label="Correu electrònic"
              type="email"
              required
              fullWidth
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Contrasenya"
              type={showPassword ? 'text' : 'password'}
              required
              fullWidth
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="canviar visibilitat de la contrasenya"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link
                component="button"
                type="button"
                variant="body2"
                onClick={() => {
                  if (onForgotPasswordClick) {
                    onForgotPasswordClick();
                  } else {
                    console.log('Recuperar contrasenya clicat');
                  }
                }}
                sx={{
                  color: 'primary.dark',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Has oblidat la teva contrasenya?
              </Link>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit" disabled={loading}>
            Cancel·lar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} /> : null}
          >
            {loading ? 'Accedint...' : 'Entrar'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};