import Footer from '../components/Footer';
import Header from '../components/Header';
import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';

const ContactPage = () => {
  // Estats
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telefon: '',
    assumpte: '',
    missatge: '',
  });

  const [enviat, setEnviat] = useState(false);
  const [touched, setTouched] = useState(false);

  // Funció pels inpunts que no son el teléfon (Textfields)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Rep directament el string amb el número
  const handlePhoneChange = (newPhone: string) => {
    setFormData({
      ...formData,
      telefon: newPhone,
    });
    
    // Marquem com a "touched"
    if (newPhone.length > 0) {
      setTouched(true);
    } else {
      setTouched(false);
    }
  };

  // 4. Validació del teléfon
  const isPhoneInvalid = touched && formData.telefon !== '' && !matchIsValidTel(formData.telefon);

  // 5. Enviament del form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Si el telèfon no es vàlid, no s'envía
    if (isPhoneInvalid) {
      return;
    }

    console.log('Dades enviades:', formData);

    setEnviat(true);
    setTouched(false);
    setFormData({
      nom: '',
      email: '',
      telefon: '',
      assumpte: '',
      missatge: '',
    });
  };

  return (
    <>
      <Header />
      <main>
        {/* Capçalera */}
        <Box
          sx={{
            py: 2,
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h1" sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.4)', p: 2, borderRadius: 2 }}>
            Contacte
          </Typography>
        </Box>

        <Container maxWidth="md" sx={{ py: 0 }}>
          {/* Text */}
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ fontSize: '1.15rem' }}>
              Tens cap dubte, vols ser casa d'acollida o col·laborar amb la protectora?
              Escriu-nos i et respondrem lo més aviat possible
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              backgroundColor: 'white',
              p: { xs: 3, sm: 6 },
              borderRadius: 3,
              boxShadow: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {/* Alerta d'enviament correcte */}
            {enviat && (
              <Alert severity="success" onClose={() => setEnviat(false)}>
                Moltes gràcies! El teu missatge s'ha enviat correctament.
              </Alert>
            )}

            {/* Camp Nom */}
            <TextField
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              fullWidth
            />

            {/* Camp Email */}
            <TextField
              label="Correu electrònic"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />

            {/* Camp Telèfon amb validació */}
            <MuiTelInput
              label="Telèfon (opcional)"
              value={formData.telefon}
              onChange={handlePhoneChange}
              error={isPhoneInvalid}
              helperText={isPhoneInvalid ? 'El número de telèfon no és vàlid' : ''}
              preferredCountries={['ES']}
              defaultCountry="ES"
              fullWidth
            />

            {/* Camp Assumpte */}
            <TextField
              label="Assumpte"
              name="assumpte"
              value={formData.assumpte}
              onChange={handleChange}
              required
              fullWidth
            />

            {/* Camp Missatge */}
            <TextField
              label="Missatge"
              name="missatge"
              value={formData.missatge}
              onChange={handleChange}
              required
              multiline
              rows={5}
              fullWidth
            />

            {/* Botó d'enviament */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              endIcon={<SendIcon />}
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: 'primary.main',
                color: 'text.primary',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Enviar missatge
            </Button>
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;