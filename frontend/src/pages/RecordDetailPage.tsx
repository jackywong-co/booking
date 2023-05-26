import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Record } from '../models/Record';
import { useReocrd } from '../contexts/RecordContext';
import AlignItemsList from '../components/AlignItemsList';

export default function RecordDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  let record = useReocrd();

  const [recordItem, setRecordItem] = useState<Record>();

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
  // TODO
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

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          {/* <CardMedia
            component="img"
            sx={{ width: 300 }}
            image={recordItem && `${import.meta.env.VITE_API_URL}/uploads/${recordItem.image}`}
          /> */}
          <Box>
            <Typography component="div" variant="h1">
              {recordItem && recordItem.firstname_en}
            </Typography>
            <Typography component="div" variant="body1" color="text.secondary">
              {recordItem && recordItem.lastname_en}
            </Typography>
          </Box>
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
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          {/* <AlignItemsList /> */}
          <Typography component="div" variant="h1">
            {recordItem && recordItem.firstname_en}
          </Typography>
          <Typography component="div" variant="body1" color="text.secondary">
            {recordItem && recordItem.lastname_en}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
