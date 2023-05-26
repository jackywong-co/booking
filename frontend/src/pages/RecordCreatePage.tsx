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

  // const handlePhotoUpload = async (file: Blob) => {
  //   const fileName = await record.uploadRecord(file);
  //   formik.setFieldValue('image', fileName);
  // };

  // function IsHKID(str: string) {
  //   var strValidChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  //   if (str.length < 8) {
  //     return false;
  //   }
  //   str = str.toUpperCase();
  //   var hkidPat = /^([A-Z]{1,2})([0-9]{6})([A0-9])$/;
  //   var matchArray = str.match(hkidPat);
  //   if (matchArray == null) {
  //     return false;
  //   }
  //   var charPart = matchArray[1];
  //   var numPart = matchArray[2];
  //   var checkDigit = matchArray[3];
  //   var checkSum = 0;
  //   if (charPart.length == 2) {
  //     checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)));
  //     checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)));
  //   } else {
  //     checkSum += 9 * 36;
  //     checkSum += 8 * (10 + strValidChars.indexOf(charPart));
  //   }

  //   for (var i = 0, j = 7; i < numPart.length; i++, j--) {
  //     checkSum += j * numPart.charAt(i);
  //   }
  //   var remaining = checkSum % 11;
  //   var verify = remaining == 0 ? 0 : 11 - remaining;
  //   return verify == checkDigit || (verify == 10 && checkDigit == 'A');
  // }

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
      id_number: Yup.string().max(99).required(),
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

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
