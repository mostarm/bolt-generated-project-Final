import { useState } from 'react';
import { agenda } from '../data/agenda';
import { Box, Card, Typography, Switch, FormControlLabel } from '@mui/material';

export default function Agenda() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const filteredAgenda = showFavorites 
    ? agenda.filter(talk => favorites.includes(talk.id))
    : agenda;

  return (
    <Box sx={{ p: 2 }}>
      <FormControlLabel
        control={
          <Switch
            checked={showFavorites}
            onChange={(e) => setShowFavorites(e.target.checked)}
          />
        }
        label="Show Favorites Only"
      />
      
      {filteredAgenda.map(talk => (
        <Card key={talk.id} sx={{ mb: 2, p: 2 }}>
          <Typography variant="h6">{talk.title}</Typography>
          <Typography>{talk.speaker}</Typography>
          <Typography>{talk.time} - {talk.room}</Typography>
        </Card>
      ))}
    </Box>
  );
}
