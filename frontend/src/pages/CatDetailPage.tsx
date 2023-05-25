import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Record } from '../models/Record';
import { useReocrd } from '../contexts/RecordContext';
import AlignItemsList from '../components/AlignItemsList';

export default function CatDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  let record = useReocrd();

  const [catItem, setCatItem] = useState<Record>();

  const initCat = async () => {
    const result = await record.getRecord(id ?? '');
    console.log('record list', result);
    setCatItem(result);
  };

  const handleCatDelete = async () => {
    if (catItem != null) {
      const result = await record.deleteRecord(catItem);
      if (result === 'Success') {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    initCat();
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <CardMedia
            component="img"
            sx={{ width: 300 }}
            image={catItem && `${import.meta.env.VITE_API_URL}/uploads/${catItem.image}`}
          />
          <Box>
            <Typography component="div" variant="h1">
              {catItem && catItem.name}
            </Typography>
            <Typography component="div" variant="body1" color="text.secondary">
              {catItem && catItem.description}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mt: 'auto' }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => navigate(`/record/edit/${catItem && catItem.id}`)}
              >
                Edit
              </Button>
              <Button variant="contained" color="error" fullWidth sx={{ mb: 1 }} onClick={handleCatDelete}>
                Delete
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ my: 5 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <AlignItemsList />
        </CardContent>
      </Card>
    </Container>
  );
}
