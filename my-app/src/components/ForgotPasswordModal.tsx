import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Box,
  Stack,
  Alert,
  CircularProgress,
  Link,
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
  onBackToLogin?: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  open,
  onClose,
  onBackToLogin,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleResetState = () => {
    setEmail('');
    setLoading(false);
    setSuccess(false);
    setErrorMsg('');
  };

  const handleClose = () => {
    handleResetState();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      // Quan connectem amb Spring Boot:
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      // if (!response.ok) throw new Error('No s\'ha pogut tramitar la sol·licitud');

      // Simulació d'enviament de correu
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 700);
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Error en enviar el correu de recuperació');
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
          <LockResetIcon />
          Recuperar Contrasenya
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            {success ? (
              <Alert severity="success">
                Hem enviat un correu a <strong>{email}</strong> amb les instruccions per restablir la teva contrasenya.
              </Alert>
            ) : (
              <>
                <DialogContentText variant="body2" color="text.secondary">
                  Introdueix la teva adreça de correu electrònic i t'enviarem un enllaç per restablir la contrasenya.
                </DialogContentText>

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
              </>
            )}

            {onBackToLogin && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => {
                    handleClose();
                    onBackToLogin();
                  }}
                  underline="hover"
                  sx={{ color: 'primary.dark', fontWeight: 500 }}
                >
                  Tornar a iniciar sessió
                </Link>
              </Box>
            )}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit" disabled={loading}>
            {success ? 'Tancar' : 'Cancel·lar'}
          </Button>

          {!success && (
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={18} /> : null}
            >
              {loading ? 'Enviant...' : 'Enviar enllaç'}
            </Button>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};