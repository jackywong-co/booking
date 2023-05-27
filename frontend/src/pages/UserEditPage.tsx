import { Box, Button, Container, CssBaseline, TextField, Typography, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '../models/User';
import { useUser } from '../contexts/UserContext';

export default function UserEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useUser();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userItem, setUserItem] = useState<User>({
    id: '',
    email: '',
    is_staff: false,
    status: 0,
    created: '',
    modified: ''
  });

  const initRecord = async () => {
    const result = await user.getUser(id ?? '');
    console.log('user get', result);
    setUserItem(result);
  };

  useEffect(() => {
    initRecord();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: userItem && userItem.id,
      email: userItem && userItem.email,
      is_staff: userItem && userItem.is_staff,
      status: userItem && userItem.status,
      created: userItem && userItem.created,
      modified: userItem && userItem.modified
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      is_staff: Yup.boolean().required()
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const result = await user.updateUser(values);
      if (result === 'Success') {
        setSubmitting(false);
        navigate(`/user/${userItem && userItem.id}`);
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
          Edit User
        </Typography>
      </Box>
      <Box>
        <Box component="form" autoComplete="off" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Email Address"
            id="email"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            select
            fullWidth
            label="Role"
            id="is_staff"
            name="is_staff"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.is_staff}
            error={formik.touched.is_staff && Boolean(formik.errors.is_staff)}
            helperText={formik.touched.is_staff && formik.errors.is_staff}
          >
            <MenuItem key="0" value="false">
              Medical Staff
            </MenuItem>
            <MenuItem key="1" value="true">
              System Admin
            </MenuItem>
          </TextField>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
