import { Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useReocrd } from '../contexts/RecordContext';
import { useUser } from '../contexts/UserContext';
import { Record } from '../models/Record';
import { User } from '../models/User';

function HomePage() {
  const navigate = useNavigate();
  let auth = useAuth();
  let record = useReocrd();
  let user = useUser();

  const [recordList, setRecordList] = useState<Record[]>([]);
  const [userList, setUserList] = useState<User[]>([]);

  const initRecordList = async () => {
    const result = await record.listRecord();
    console.log('record list', result);
    setRecordList(result);
  };

  const initUserList = async () => {
    const result = await user.listUser();
    console.log('user list', result);
    setUserList(result);
  };

  useEffect(() => {
    initRecordList();
    initUserList();
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      {!auth.getRole() && (
        <Button variant="contained" onClick={() => navigate('/record/create')}>
          Add Record
        </Button>
      )}
      {auth.isLogin() && !auth.getRole() && (
        <Grid container sx={{ pt: 2 }} spacing={2}>
          {recordList.map((record: any) => (
            <Grid item key={record.id} xs={12} sm={6} md={2}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                onClick={() => navigate(`/record/${record.id}`)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {record.firstname_en}
                  </Typography>
                  <Typography>{record.lastname_en}</Typography>
                  <Typography>{record.verify_identity ? 'Verified' : 'Not Verified'}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {auth.isLogin() && !auth.getRole() && recordList.length == 0 && <Typography>No Record</Typography>}

      {auth.isLogin() && auth.getRole() && (
        <Button variant="contained" onClick={() => navigate('/user/create')}>
          Add User
        </Button>
      )}
      {auth.isLogin() && auth.getRole() && (
        <Grid container sx={{ pt: 2 }} spacing={2}>
          {userList.map((user: any) => (
            <Grid item key={user.id} xs={12} sm={6} md={2}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                onClick={() => navigate(`/user/${user.id}`)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography>{user.email}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {auth.isLogin() && auth.getRole() && userList.length == 0 && <Typography>No User</Typography>}
    </Container>
  );
}

export default HomePage;
