import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  Button,
  Box,
  Chip,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

export interface AdoptAnimal {
  id?: number;
  nom: string;
  descripcio?: string;
  dataNaixament?: string;
  ubicacio?: string;
  esterilitzat?: boolean;
  medicacio?: string;
  vacunes?: string;
  cronic?: boolean;
  adoptat?: boolean;
  fotos?: string[];
  fotoUrl?: string;
}

interface AdoptFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    id?: number;
    nom: string;
    descripcio: string;
    dataNaixament: string;
    ubicacio: string;
    esterilitzat: boolean;
    medicacio: string;
    vacunes: string;
    cronic: boolean;
    fotos: string[];
  }) => void;
  initialData?: AdoptAnimal | null;
}

const vacunasCatalogo = [
  'Rabia',
  'Polivalente',
  'Tetravalente',
  'Trivalente Felina',
  'Leucemia',
  'Parvovirus',
  'Tos de las perreras',
];

export const AdoptFormModal: React.FC<AdoptFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const isEditing = Boolean(initialData?.id);

  const [nom, setNom] = useState('');
  const [descripcio, setDescripcio] = useState('');
  const [dataNaixament, setDataNaixament] = useState('');
  const [ubicacio, setUbicacio] = useState('');
  const [esterilitzat, setEsterilitzat] = useState(false);
  const [medicacio, setMedicacio] = useState('');
  const [vacunes, setVacunes] = useState<string[]>([]);
  const [cronic, setCronic] = useState(false);
  const [fotosExistents, setFotosExistents] = useState<string[]>([]);
  const [novesFotos, setNovesFotos] = useState<File[]>([]);

  useEffect(() => {
    if (open) {
      if (initialData) {
        // Formatear fecha a YYYY-MM-DD para evitar que el input la vacíe
        let fechaLimpia = '';
        if (initialData.dataNaixament) {
          fechaLimpia = initialData.dataNaixament.includes('T')
            ? initialData.dataNaixament.split('T')[0]
            : initialData.dataNaixament;
        }

        // Convertir vacunas a array limpio
        const vacArray = Array.isArray(initialData.vacunes)
          ? initialData.vacunes
          : initialData.vacunes
          ? (initialData.vacunes as string).split(',').map((v) => v.trim()).filter(Boolean)
          : [];

        setNom(initialData.nom || '');
        setDescripcio(initialData.descripcio || '');
        setDataNaixament(fechaLimpia);
        setUbicacio(initialData.ubicacio || '');
        setEsterilitzat(Boolean(initialData.esterilitzat));
        setMedicacio(initialData.medicacio || '');
        setVacunes(vacArray);
        setCronic(Boolean(initialData.cronic));
        setFotosExistents(
          initialData.fotos || (initialData.fotoUrl ? [initialData.fotoUrl] : [])
        );
      } else {
        // Reset completo al crear
        setNom('');
        setDescripcio('');
        setDataNaixament('');
        setUbicacio('');
        setEsterilitzat(false);
        setMedicacio('');
        setVacunes([]);
        setCronic(false);
        setFotosExistents([]);
      }
      setNovesFotos([]);
    }
  }, [initialData, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNovesFotos((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleRemoveNovaFoto = (index: number) => {
    setNovesFotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveFotoExistent = (index: number) => {
    setFotosExistents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const urlsNoves = novesFotos.map((file) => URL.createObjectURL(file));
    const fotosTotals = [...fotosExistents, ...urlsNoves];

    onSubmit({
      id: initialData?.id,
      nom,
      descripcio,
      dataNaixament,
      ubicacio,
      esterilitzat,
      medicacio,
      vacunes: vacunes.join(', '),
      cronic,
      fotos: fotosTotals,
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            backgroundColor: 'primary.main',
            color: 'text.primary',
            fontWeight: 'bold',
          }}
        >
          {isEditing ? `Editar Mascota: ${initialData?.nom}` : 'Añadir Mascota en Adopción'}
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {/* 1. Nombre */}
            <TextField
              label="Nombre del animal"
              required
              fullWidth
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />

            {/* 2. Fotos */}
            <Box>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                {isEditing ? 'Añadir más fotos' : 'Subir una o varias fotos'}
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>

              {(fotosExistents.length > 0 || novesFotos.length > 0) && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
                  {fotosExistents.map((_, index) => (
                    <Chip
                      key={`exist-${index}`}
                      label={`Foto guardada ${index + 1}`}
                      onDelete={() => handleRemoveFotoExistent(index)}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                  {novesFotos.map((file, index) => (
                    <Chip
                      key={`new-${index}`}
                      label={file.name}
                      onDelete={() => handleRemoveNovaFoto(index)}
                      size="small"
                      color="secondary"
                      variant="filled"
                    />
                  ))}
                </Box>
              )}
            </Box>

            {/* 3. Fecha de nacimiento */}
            <TextField
              label="Fecha de nacimiento"
              type="date"
              slotProps={{ inputLabel: { shrink: true } as any }}
              required
              fullWidth
              value={dataNaixament}
              onChange={(e) => setDataNaixament(e.target.value)}
            />

            {/* 4. Ubicación */}
            <TextField
              label="Ubicación (ej: Casa de acogida - Barcelona)"
              fullWidth
              value={ubicacio}
              onChange={(e) => setUbicacio(e.target.value)}
            />

            {/* 5. Checkboxes Esterilizado y Crónico */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={esterilitzat}
                    onChange={(e) => setEsterilitzat(e.target.checked)}
                  />
                }
                label="Esterilizado/a"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cronic}
                    onChange={(e) => setCronic(e.target.checked)}
                  />
                }
                label="Tratamiento Crónico"
              />
            </Box>

            {/* 6. Medicación */}
            <TextField
              label="Medicación"
              fullWidth
              value={medicacio}
              onChange={(e) => setMedicacio(e.target.value)}
            />

            {/* 7. Vacunas */}
            <Autocomplete
              multiple
              freeSolo
              options={vacunasCatalogo}
              value={vacunes}
              onChange={(_, val) => setVacunes(val as string[])}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Vacunas"
                  placeholder="Selecciona o escribe una nueva y pulsa Enter"
                />
              )}
            />

            {/* 8. Descripción */}
            <TextField
              label="Descripción"
              multiline
              rows={3}
              fullWidth
              value={descripcio}
              onChange={(e) => setDescripcio(e.target.value)}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancelar
          </Button>
          <Button type="submit" variant="contained">
            {isEditing ? 'Guardar Cambios' : 'Guardar Adopción'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};