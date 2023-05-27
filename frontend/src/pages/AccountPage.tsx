import { Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { User } from '../models/User';

function AccountPage() {
  const navigate = useNavigate();
  let auth = useAuth();
  let user = useUser();

  const [userList, setUserList] = useState<User[]>([]);

  const initUserList = async () => {
    const result = await user.listUser();
    console.log('User list', result);
    setUserList(result);
  };

  useEffect(() => {
    initUserList();
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Button variant="contained" onClick={() => navigate('/user/create')}>
        Add User
      </Button>
      {auth.isLogin() && auth.getRole() == '1' && (
        <Grid container sx={{ pt: 2 }} spacing={2}>
          {userList.map((User: any) => (
            <Grid item key={User.id} xs={12} sm={6} md={2}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                onClick={() => navigate(`/User/${User.id}`)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {User.firstname_en}
                  </Typography>
                  <Typography>{User.lastname_en}</Typography>
                  <Typography>{User.verify_identity ? 'Verified' : 'Not Verified'}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default AccountPage;
