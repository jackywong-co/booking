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

  const hkidRegex = /^[A-Z]{1,2}[0-9]{6}[A0-9]$/;
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
  const place_of_vaccine = [
    {
      value: '0',
      label: 'Sha Tin'
    },
    {
      value: '1',
      label: 'Tai Wai'
    }
  ];

  let booking_date = [
    {
      value: '2023-05-28',
      label: '2023-05-28',
      status: 0
    },
    {
      value: '2023-05-29',
      label: '2023-05-29',
      status: 0
    },
    {
      value: '2023-05-30',
      label: '2023-05-30',
      status: 0
    },
    {
      value: '2023-05-31',
      label: '2023-05-31',
      status: 0
    }
  ];
  let booking_time = [
    {
      value: '09:00:00',
      label: '09:00:00',
      status: 0
    },
    {
      value: '10:00:00',
      label: '10:00:00',
      status: 0
    },
    {
      value: '11:00:00',
      label: '11:00:00',
      status: 0
    },
    {
      value: '12:00:00',
      label: '12:00:00',
      status: 0
    },
    {
      value: '13:00:00',
      label: '13:00:00',
      status: 0
    },
    {
      value: '14:00:00',
      label: '14:00:00',
      status: 0
    },
    {
      value: '15:00:00',
      label: '15:00:00',
      status: 0
    }
  ];
  const isValidChecksum = (hkid: any) => {
    var strValidChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (hkid.length < 8) {
      return false;
    }
    hkid = hkid.toUpperCase();
    var hkidPat = /^([A-Z]{1,2})([0-9]{6})([A0-9])$/;
    var matchArray = hkid.match(hkidPat);
    if (matchArray == null) {
      return false;
    }
    var charPart = matchArray[1];
    var numPart = matchArray[2];
    var checkDigit = matchArray[3];
    var checkSum = 0;
    if (charPart.length == 2) {
      checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)));
      checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)));
    } else {
      checkSum += 9 * 36;
      checkSum += 8 * (10 + strValidChars.indexOf(charPart));
    }

    for (var i = 0, j = 7; i < numPart.length; i++, j--) {
      checkSum += j * numPart.charAt(i);
    }
    var remaining = checkSum % 11;
    var verify = remaining == 0 ? 0 : 11 - remaining;
    return verify == checkDigit || (verify == 10 && checkDigit == 'A');
  };

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
      brand_of_vaccine: '',
      place_of_vaccine: ''
    },
    validationSchema: Yup.object({
      firstname_en: Yup.string().max(99).required('Engligh First Name is a required field'),
      lastname_en: Yup.string().max(99).required('Engligh Last Name is a required field'),
      firstname_zh: Yup.string().max(99).required('Chinese First Name is a required field'),
      lastname_zh: Yup.string().max(99).required('Chinese First Name is a required field'),
      id_number: Yup.string()
        .max(8, 'HKID must be at most 8 characters')
        .required('HKID is a required field')
        .matches(hkidRegex, 'Invalid HKID format')
        .test('isValidChecksum', 'Invalid HKID checksum', (value) => isValidChecksum(value)),
      gender: Yup.string().max(99).required('Gender is a required field'),
      date_of_birth: Yup.string().max(99).required('Date of Birth is a required field'),
      booking_date: Yup.string().max(99).required('Booking Date is a required field'),
      booking_time: Yup.string().max(99).required('Booking Time is a required field'),
      address: Yup.string().max(99).required('Address is a required field'),
      place_of_birth: Yup.string().max(99).required('Place of Birth is a required field'),
      brand_of_vaccine: Yup.string().max(99).required('Brand of Vaccine is a required field'),
      place_of_vaccine: Yup.string().max(99).required('Place of Vaccine is a required field')
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
            select
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.booking_date}
            error={formik.touched.booking_date && Boolean(formik.errors.booking_date)}
            helperText={formik.touched.booking_date && formik.errors.booking_date}
          >
            {booking_date.map((option) => (
              <MenuItem key={option.value} value={option.value} disabled={option.status == 1}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
            label="Booking Time"
            id="booking_time"
            name="booking_time"
            select
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.booking_time}
            error={formik.touched.booking_time && Boolean(formik.errors.booking_time)}
            helperText={formik.touched.booking_time && formik.errors.booking_time}
          >
            {booking_time.map((option) => (
              <MenuItem key={option.value} value={option.value} disabled={option.status == 1}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
          <TextField
            fullWidth
            margin="normal"
            label="Place of Vaccine"
            id="place_of_vaccine"
            name="place_of_vaccine"
            select
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.place_of_vaccine}
            error={formik.touched.place_of_vaccine && Boolean(formik.errors.place_of_vaccine)}
            helperText={formik.touched.place_of_vaccine && formik.errors.place_of_vaccine}
          >
            {place_of_vaccine.map((option) => (
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
