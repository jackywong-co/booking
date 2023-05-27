import { Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useReocrd } from '../contexts/RecordContext';
import { Record } from '../models/Record';

function AccountPage() {
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

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Button variant="contained" onClick={() => navigate('/record/create')}>
        Add Record
      </Button>

      {/* {auth.isLogin() && auth.getRole() == '0' && (
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
      {auth.isLogin() && auth.getRole() == '0' && recordList.length == 0 && <Typography>No Record</Typography>} */}

      {auth.isLogin() && auth.getRole() == '1' && (
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
    </Container>
  );
}

export default AccountPage;
