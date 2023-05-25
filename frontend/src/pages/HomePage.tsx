import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  Box,
  Select
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useReocrd } from '../contexts/RecordContext';
import { Record } from '../models/Record';
import SearchIcon from '@mui/icons-material/Search';
import { useFormik } from 'formik';
import * as Yup from 'yup';
function HomePage() {
  const navigate = useNavigate();
  let auth = useAuth();
  let record = useReocrd();

  const [recordList, setRecordList] = useState<Record[]>([]);

  const initRecordList = async () => {
    const result = await record.listRecord();
    console.log('record list', result);
    setRecordList(result);
  };

  useEffect(() => {
    initRecordList();
  }, []);
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
    <Container sx={{ py: 8 }} maxWidth="xl">
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
            id="firstname_zh"
            name="firstname_zh"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastname_zh}
            error={formik.touched.lastname_zh && Boolean(formik.errors.lastname_zh)}
            helperText={formik.touched.lastname_zh && formik.errors.lastname_zh}
          />
          <TextField
            fullWidth
            margin="normal"
            label="id_number"
            id="id_number"
            name="id_number"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.id_number}
            error={formik.touched.id_number && Boolean(formik.errors.id_number)}
            helperText={formik.touched.id_number && formik.errors.id_number}
          />
          <Select labelId="demo-simple-select-label" id="demo-simple-select">
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <TextField
            fullWidth
            margin="normal"
            label="gender"
            id="gender"
            name="gender"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.gender}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
          />
          <TextField
            fullWidth
            margin="normal"
            label="date_of_birth"
            id="date_of_birth"
            name="date_of_birth"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.date_of_birth}
            error={formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)}
            helperText={formik.touched.date_of_birth && formik.errors.date_of_birth}
          />
          <TextField
            fullWidth
            margin="normal"
            label="booking_date"
            id="booking_date"
            name="booking_date"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.booking_date}
            error={formik.touched.booking_date && Boolean(formik.errors.booking_date)}
            helperText={formik.touched.booking_date && formik.errors.booking_date}
          />
          <TextField
            fullWidth
            margin="normal"
            label="booking_time"
            id="booking_time"
            name="booking_time"
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
            label="place_of_birth"
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
            label="brand_of_vaccine"
            id="brand_of_vaccine"
            name="brand_of_vaccine"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.brand_of_vaccine}
            error={formik.touched.brand_of_vaccine && Boolean(formik.errors.brand_of_vaccine)}
            helperText={formik.touched.brand_of_vaccine && formik.errors.brand_of_vaccine}
          />
          {/* {formik.values.image == '' ? (
            <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={isLoading} />
          ) : (
            <img src={`${import.meta.env.VITE_API_URL}/uploads/${formik.values.image}`} width="200" loading="lazy" />
          )} */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>

      {/* <Card sx={{ my: 2 }}>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={10}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item xs sx={{ minWidth: '150px' }}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          )
                        }}
                        label="Search"
                        placeholder="Search by Name"
                        id="filterSearch"
                        name="filterSearch"
                      />
                    </Grid>
                    <Grid item xs sx={{ minWidth: '150px' }}>
                      <TextField select fullWidth margin="dense" label="Breed" id="breed" name="breed">
                        <MenuItem key="1" value="1">
                          1
                        </MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card> */}

      {/* {auth.isLogin() && auth.getRole() === '2' && (
        <Button variant="contained" onClick={() => navigate('/record/create')}>
          Add Record
        </Button>
      )} */}

      {/* {recordList.length > 0 && (
        <Grid container sx={{ pt: 2 }} spacing={2}>
          {recordList.map((record: any) => (
            <Grid item key={record.id} xs={12} sm={6} md={2}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                onClick={() => navigate(`/record/${record.id}`)}
              >
                <CardMedia
                  component="img"
                  image={`${import.meta.env.VITE_API_URL}/uploads/${record.image}`}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {record.name}
                  </Typography>
                  <Typography>{record.description}</Typography>
                </CardContent>
                <CardActions>
                  {auth.isLogin() && auth.getRole() === '1' && (
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {recordList.length == 0 && <Typography>No Record</Typography>} */}
    </Container>
  );
}

export default HomePage;
