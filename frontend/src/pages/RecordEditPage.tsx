import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useReocrd } from '../contexts/RecordContext';
import { useNavigate, useParams } from 'react-router-dom';
import PhotoUploadWidget from '../components/PhotoUploadWidget';
import { useEffect, useState } from 'react';
import { Record } from '../models/Record';

export default function RecordEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const record = useReocrd();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [catItem, setCatItem] = useState<Record>();

  const initCat = async () => {
    const result = await record.getRecord(id ?? '');
    console.log('record list', result);
    setCatItem(result);
  };

  const handlePhotoUpload = async (file: Blob) => {
    const fileName = await record.uploadRecord(file);
    formik.setFieldValue('image', fileName);
  };

  const handleResetPhoto = () => {
    formik.setFieldValue('image', '');
  };

  useEffect(() => {
    initCat();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: catItem && catItem.id,
      name: catItem && catItem.name,
      breed: catItem && catItem.breed,
      age: catItem && catItem.age,
      description: catItem && catItem.description,
      image: catItem && catItem.image
    },
    validationSchema: Yup.object({
      id: Yup.string().max(99).required(),
      name: Yup.string().max(99).required(),
      breed: Yup.string().max(99).required(),
      age: Yup.string().required(),
      description: Yup.string().max(99).required(),
      image: Yup.string().max(99)
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const result = await record.updateRecord(values);
      if (result === 'Success') {
        setSubmitting(false);
        navigate('/');
      }
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h5">
          Edit Record
        </Typography>
      </Box>
      <Box>
        <Box component="form" autoComplete="off" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
            label="Record Name"
            id="name"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
            label="Record Breed"
            id="breed"
            name="breed"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.breed}
            error={formik.touched.breed && Boolean(formik.errors.breed)}
            helperText={formik.touched.breed && formik.errors.breed}
          />
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
            label="Record Age"
            id="age"
            name="age"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.age}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
          />
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
            label="Record Description"
            id="description"
            name="description"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.description}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          {formik.values.image == '' ? (
            <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={isLoading} />
          ) : (
            <img src={`${import.meta.env.VITE_API_URL}/uploads/${formik.values.image}`} width="200" loading="lazy" />
          )}
          <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleResetPhoto}>
            Delete Photo
          </Button>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
