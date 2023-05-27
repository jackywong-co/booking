import { Box, Button, Card, CardContent, Container, TextField, MenuItem } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useEffect, useState } from 'react';
import { User } from '../models/User';

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  let user = useUser();

  const [userItem, setUserItem] = useState<User>({
    id: '',
    email: '',
    is_staff: false,
    status: 1,
    created: '',
    modified: ''
  });
  const initUser = async () => {
    const result = await user.getUser(id ?? '');
    console.log('user get', result);
    setUserItem(result);
  };

  useEffect(() => {
    initUser();
  }, []);

  const handleUserDelete = async () => {
    if (userItem != null) {
      const result = await user.deleteUser(userItem);
      if (result === 'Success') {
        navigate('/');
      }
    }
  };
  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box>
            <Typography component="div" variant="h2">
              {userItem && userItem.email}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mt: 'auto' }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => navigate(`/user/edit/${userItem && userItem.id}`)}
              >
                Edit
              </Button>
              <Button variant="contained" color="error" fullWidth sx={{ mb: 1 }} onClick={handleUserDelete}>
                Delete
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ my: 5 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          {userItem.is_staff && (
            <Typography component="h1" variant="h5">
              System Admin
            </Typography>
          )}
          {!userItem.is_staff && (
            <Typography component="h1" variant="h5">
              Medical Staff
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
