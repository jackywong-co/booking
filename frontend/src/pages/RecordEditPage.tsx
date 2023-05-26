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
  const [recordItem, setRecordItem] = useState<Record>();

  const initRecord = async () => {
    const result = await record.getRecord(id ?? '');
    console.log('record list', result);
    setRecordItem(result);
  };

  const handlePhotoUpload = async (file: Blob) => {
    const fileName = await record.uploadRecord(file);
    formik.setFieldValue('image', fileName);
  };

  // const handleResetPhoto = () => {
  //   formik.setFieldValue('image', '');
  // };

  useEffect(() => {
    initRecord();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: recordItem && recordItem.id,
<<<<<<< HEAD
      ref_code: recordItem && recordItem.ref_code,
      firstname_en: recordItem && recordItem.firstname_en,
      lastname_en: recordItem && recordItem.lastname_en,
      firstname_zh: recordItem && recordItem.firstname_zh,
      lastname_zh: recordItem && recordItem.lastname_zh,
      id_number: recordItem && recordItem.id_number,
      gender: recordItem && recordItem.gender,
      date_of_birth: recordItem && recordItem.date_of_birth,
      booking_date: recordItem && recordItem.booking_date,
      booking_time: recordItem && recordItem.booking_time,
      address: recordItem && recordItem.address,
      place_of_birth: recordItem && recordItem.place_of_birth,
      brand_of_vaccine: recordItem && recordItem.brand_of_vaccine,
      verify_identity: recordItem && recordItem.verify_identity,
      status: recordItem && recordItem.status,
      created: recordItem && recordItem.created,
      modified: recordItem && recordItem.modified
    },
    validationSchema: Yup.object({
      id: Yup.string().max(99).required(),
      ref_code: Yup.string().max(99).required(),
      firstname_en: Yup.string().max(99).required(),
      lastname_en: Yup.string().max(99).required(),
      firstname_zh: Yup.string().max(99).required(),
      lastname_zh: Yup.string().max(99).required(),
      id_number: Yup.string().max(99).required(),
      gender: Yup.string().max(99).required(),
      date_of_birth: Yup.string().max(99).required(),
      booking_date: Yup.string().max(99).required(),
      booking_time: Yup.string().max(99).required(),
      address: Yup.string().max(99).required(),
      place_of_birth: Yup.string().max(99).required(),
      brand_of_vaccine: Yup.string().max(99).required(),
      verify_identity: Yup.boolean().required(),
      status: Yup.string().max(99).required(),
      created: Yup.string().max(99).required(),
      modified: Yup.string().max(99).required()
=======
      name: recordItem && recordItem.name,
      breed: recordItem && recordItem.breed,
      age: recordItem && recordItem.age,
      description: recordItem && recordItem.description,
      image: recordItem && recordItem.image
    },
    validationSchema: Yup.object({
      id: Yup.string().max(99).required(),
      name: Yup.string().max(99).required(),
      breed: Yup.string().max(99).required(),
      age: Yup.string().required(),
      description: Yup.string().max(99).required(),
      image: Yup.string().max(99)
>>>>>>> parent of 68a8503 (no message)
    }),
    onSubmit: async (values, { setSubmitting }) => {
      // TODO
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
<<<<<<< HEAD
            margin="normal"
            label="English First Name "
            id="firstname_en"
            name="firstname_en"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstname_en}
            error={formik.touched.firstname_en && Boolean(formik.errors.firstname_en)}
            helperText={formik.touched.firstname_en && formik.errors.firstname_en}
          />
          <TextField
            fullWidth
            margin="normal"
            label="English Last Name"
            id="lastname_en"
            name="lastname_en"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastname_en}
            error={formik.touched.lastname_en && Boolean(formik.errors.lastname_en)}
            helperText={formik.touched.lastname_en && formik.errors.lastname_en}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Chinese First Name"
            id="firstname_zh"
            name="firstname_zh"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstname_zh}
            error={formik.touched.firstname_zh && Boolean(formik.errors.firstname_zh)}
            helperText={formik.touched.firstname_zh && formik.errors.firstname_zh}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Chinese Last Name"
            id="lastname_zh"
            name="lastname_zh"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastname_zh}
            error={formik.touched.lastname_zh && Boolean(formik.errors.lastname_zh)}
            helperText={formik.touched.lastname_zh && formik.errors.lastname_zh}
          />
          <TextField
            fullWidth
            margin="normal"
            label="HKID"
            id="id_number"
            name="id_number"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.id_number}
            error={formik.touched.id_number && Boolean(formik.errors.id_number)}
            helperText={formik.touched.id_number && formik.errors.id_number}
          />
          <FormControl sx={{ mt: 1, minWidth: 400 }}>
            <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="gender"
              name="gender"
              value={formik.values.gender}
              label="gender"
              onChange={formik.handleChange}
              required
            >
              <MenuItem value={0}>M</MenuItem>
              <MenuItem value={1}>F</MenuItem>
              <MenuItem value={2}>Other</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Date of Birth"
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            defaultValue="/0405/2017"
            InputLabelProps={{
              shrink: true
            }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.date_of_birth}
            error={formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)}
            helperText={formik.touched.date_of_birth && formik.errors.date_of_birth}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Booking Date"
            id="booking_date"
            name="booking_date"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.booking_date}
            error={formik.touched.booking_date && Boolean(formik.errors.booking_date)}
            helperText={formik.touched.booking_date && formik.errors.booking_date}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Bookgin Time"
            id="booking_time"
            name="booking_time"
            type="time"
            InputLabelProps={{
              shrink: true
            }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.booking_time}
            error={formik.touched.booking_time && Boolean(formik.errors.booking_time)}
            helperText={formik.touched.booking_time && formik.errors.booking_time}
          />
          <TextField
            fullWidth
            margin="normal"
            label="address"
            id="address"
            name="address"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.address}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Place of Birth"
            id="place_of_birth"
            name="place_of_birth"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.place_of_birth}
            error={formik.touched.place_of_birth && Boolean(formik.errors.place_of_birth)}
            helperText={formik.touched.place_of_birth && formik.errors.place_of_birth}
          />

          <FormControl sx={{ mt: 1, minWidth: 400 }}>
            <InputLabel id="demo-simple-select-helper-label">Brand of Vaccine</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="brand_of_vaccine"
              name="brand_of_vaccine"
              value={formik.values.brand_of_vaccine}
              label="brand_of_vaccine"
              onChange={formik.handleChange}
              required
            >
              <MenuItem value={0}>Comirnaty</MenuItem>
              <MenuItem value={1}>CoronaVac</MenuItem>
            </Select>
          </FormControl>
=======
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
>>>>>>> parent of 68a8503 (no message)
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
