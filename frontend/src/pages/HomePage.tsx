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

      {/* {auth.isLogin() && auth.getRole() === '2' && ( */}
      <Button variant="contained" onClick={() => navigate('/record/create')}>
        Add Record
      </Button>
      {/* )} */}

      {auth.isLogin() && (
        <Grid container sx={{ pt: 2 }} spacing={2}>
          {recordList.map((record: any) => (
            <Grid item key={record.id} xs={12} sm={6} md={2}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                onClick={() => navigate(`/record/${record.id}`)}
              >
                {/* <CardMedia
                  component="img"
                  image={`${import.meta.env.VITE_API_URL}/uploads/${record.image}`}
                  alt="random"
                /> */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {record.firstname_en}
                  </Typography>
                  <Typography>{record.lastname_en}</Typography>
                </CardContent>
                {/* <CardActions>
                  {auth.isLogin() && auth.getRole() === '1' && (
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                  )}
                </CardActions> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {auth.isLogin() && recordList.length == 0 && <Typography>No Record</Typography>}
    </Container>
  );
}

export default HomePage;
