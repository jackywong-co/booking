import { Box, Button, Card, CardContent, Container, TextField, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Record } from '../models/Record';
import { useReocrd } from '../contexts/RecordContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

export default function RecordDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  let record = useReocrd();

  const [recordItem, setRecordItem] = useState<Record>({
    id: '',
    ref_code: '',
    firstname_en: '',
    lastname_en: '',
    firstname_zh: '',
    lastname_zh: '',
    id_number: '',
    gender: 0,
    date_of_birth: '',
    booking_date: '',
    booking_time: '',
    address: '',
    place_of_birth: '',
    brand_of_vaccine: 0,
    verify_identity: false,
    status: 0,
    created: '',
    modified: ''
  });
  const initRecord = async () => {
    const result = await record.getRecord(id ?? '');
    setRecordItem(result);
  };

  const handleRecordDelete = async () => {
    if (recordItem != null) {
      const result = await record.deleteRecord(recordItem);
      if (result === 'Success') {
        navigate('/');
      }
    }
  };

  const handleRecordVerify = async () => {
    if (recordItem != null) {
      const result = await record.verifyRecord(recordItem);
      if (result === 'Success') {
        initRecord();
      }
    }
  };

  useEffect(() => {
    initRecord();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: recordItem && recordItem.id,
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
    onSubmit: async (values, { setSubmitting }) => {}
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

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35
    },
    title: {
      fontSize: 24,
      textAlign: 'center'
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey'
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey'
    }
  });
  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ ml: 'auto', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mt: 'auto' }}>
              <Button
                variant={recordItem?.verify_identity == false ? 'outlined' : 'contained'}
                color="success"
                fullWidth
                sx={{ mb: 1 }}
                onClick={handleRecordVerify}
              >
                Verify
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => navigate(`/record/edit/${recordItem && recordItem.id}`)}
              >
                Edit
              </Button>
              <Button variant="contained" color="error" fullWidth sx={{ mb: 1 }} onClick={handleRecordDelete}>
                Delete
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ my: 5 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box component="form" autoComplete="off" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              fullWidth
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
          </Box>

          <Box sx={{ ml: 'auto', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mt: 'auto' }}>
              <PDFDownloadLink
                document={
                  <Document>
                    <Page size={'A4'} style={{ ...styles.body }}>
                      <Text style={styles.title}>Vaccination Record</Text>
                      <Text style={styles.text}>Ref Code : {recordItem.ref_code}</Text>
                      <Text style={styles.text}>English First Name : {recordItem.firstname_en}</Text>
                      <Text style={styles.text}>English Last Name : {recordItem.lastname_en}</Text>
                      <Text style={styles.text}>Chinese First Name : {recordItem.firstname_zh}</Text>
                      <Text style={styles.text}>Chinese Last Name : {recordItem.lastname_zh}</Text>
                      <Text style={styles.text}>HKID Number : {recordItem.id_number}</Text>
                      <Text style={styles.text}>Gender : {gender[recordItem.gender].label}</Text>
                      <Text style={styles.text}>Date of Birth : {recordItem.date_of_birth}</Text>
                      <Text style={styles.text}>Vaccination Date : {recordItem.booking_date}</Text>
                      <Text style={styles.text}>Vaccination Time : {recordItem.booking_time}</Text>
                      <Text style={styles.text}>Address : {recordItem.address}</Text>
                      <Text style={styles.text}>Place of Birth : {recordItem.place_of_birth}</Text>
                      <Text style={styles.text}>
                        Brand of Vaccine : {brand_of_vaccine[recordItem.brand_of_vaccine].label}
                      </Text>
                    </Page>
                  </Document>
                }
                fileName="Vaccination Record"
              >
                <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>
                  Print Vaccination Record
                </Button>
              </PDFDownloadLink>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
