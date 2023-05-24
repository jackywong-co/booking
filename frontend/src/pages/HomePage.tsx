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
  Typography
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useCat } from '../contexts/CatContext';
import { Cat } from '../models/Cat';
import SearchIcon from '@mui/icons-material/Search';

function HomePage() {
  const navigate = useNavigate();
  let auth = useAuth();
  let cat = useCat();

  const [catList, setCatList] = useState<Cat[]>([]);

  const initCatList = async () => {
    const result = await cat.listCat();
    console.log('cat list', result);
    setCatList(result);
  };

  useEffect(() => {
    initCatList();
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Card sx={{ my: 2 }}>
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
      </Card>

      {auth.isLogin() && auth.getRole() === '2' && (
        <Button variant="contained" onClick={() => navigate('/cat/create')}>
          Add Cat
        </Button>
      )}

      {catList.length > 0 && (
        <Grid container sx={{ pt: 2 }} spacing={2}>
          {catList.map((cat: any) => (
            <Grid item key={cat.id} xs={12} sm={6} md={2}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                onClick={() => navigate(`/cat/${cat.id}`)}
              >
                <CardMedia
                  component="img"
                  image={`${import.meta.env.VITE_API_URL}/uploads/${cat.image}`}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {cat.name}
                  </Typography>
                  <Typography>{cat.description}</Typography>
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
      {catList.length == 0 && <Typography>No Cat</Typography>}
    </Container>
  );
}

export default HomePage;
