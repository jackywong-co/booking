import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText
} from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useReocrd } from '../contexts/RecordContext';
import { useNavigate } from 'react-router-dom';
// import PhotoUploadWidget from '../components/PhotoUploadWidget';
import { useState } from 'react';

export default function RecordCreatePage() {
  const navigate = useNavigate();
  const record = useReocrd();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      firstname_en: '',
      lastname_en: '',
      firstname_zh: '',
      lastname_zh: '',
      id_number: '',
      gender: '',
      date_of_birth: '',
      booking_date: '',
      booking_time: '',
      address: '',
      place_of_birth: '',
      brand_of_vaccine: ''
    },
    validationSchema: Yup.object({
      firstname_en: Yup.string().max(99).required(),
      lastname_en: Yup.string().max(99).required(),
      firstname_zh: Yup.string().max(99).required(),
      lastname_zh: Yup.string().max(99).required(),
      id_number: Yup.string()
        .max(99)
        .required()
        .matches(/^[A-Z]{1,2}[0-9]{6}[0-9A]$/),
      gender: Yup.string().max(99).required(),
      date_of_birth: Yup.string().max(99).required(),
      booking_date: Yup.string().max(99).required(),
      booking_time: Yup.string().max(99).required(),
      address: Yup.string().max(99).required(),
      place_of_birth: Yup.string().max(99).required(),
      brand_of_vaccine: Yup.string().max(99).required()
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const result = await record.createRecord(values);
      if (result === 'Success') {
        setSubmitting(false);
        navigate('/');
      }
    }
  });
  const gender = [
    {
      value: '0',
      label: 'M'
    },
    {
      value: '1',
      label: 'F'
    },
    {
      value: '2',
      label: 'Other'
    }
  ];

  const brand_of_vaccine = [
    {
      value: '0',
      label: 'Comirnaty'
    },
    {
      value: '1',
      label: 'CoronaVac'
    }
  ];
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
          Create Record
        </Typography>
      </Box>
      <Box>
        <Box component="form" autoComplete="off" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
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
          <TextField
            fullWidth
            margin="normal"
            label="Gender"
            id="gender"
            name="gender"
            select
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.gender}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
          >
            {gender.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
            label="Date of Birth"
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.date_of_birth}
            error={formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)}
            helperText={formik.touched.date_of_birth && formik.errors.date_of_birth}
          />

          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
            label="Booking Date"
            id="booking_date"
            name="booking_date"
            type="date"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.booking_date}
            error={formik.touched.booking_date && Boolean(formik.errors.booking_date)}
            helperText={formik.touched.booking_date && formik.errors.booking_date}
          />
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
            label="Bookgin Time"
            id="booking_time"
            name="booking_time"
            type="time"
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
          <TextField
            fullWidth
            margin="normal"
            label="Brand of Vaccine"
            id="brand_of_vaccine"
            name="brand_of_vaccine"
            select
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.brand_of_vaccine}
            error={formik.touched.brand_of_vaccine && Boolean(formik.errors.brand_of_vaccine)}
            helperText={formik.touched.brand_of_vaccine && formik.errors.brand_of_vaccine}
          >
            {brand_of_vaccine.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
