import { useState } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  Avatar, 
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { speakers } from '../data/speakers';

function Speakers() {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const handleSpeakerClick = (speaker) => {
    setSelectedSpeaker(speaker);
  };

  const handleClose = () => {
    setSelectedSpeaker(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {speakers.map(speaker => (
          <Grid item xs={12} key={speaker.id}>
            <Card 
              sx={{ 
                p: 2, 
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' }
              }}
              onClick={() => handleSpeakerClick(speaker)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  src={speaker.image}
                  sx={{ width: 80, height: 80, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">{speaker.name}</Typography>
                  <Typography color="text.secondary">{speaker.title}</Typography>
                  <Chip 
                    label={`${speaker.talks.length} ${speaker.talks.length === 1 ? 'Talk' : 'Talks'}`}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog 
        open={Boolean(selectedSpeaker)} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        {selectedSpeaker && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{selectedSpeaker.name}</Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Avatar 
                  src={selectedSpeaker.image}
                  sx={{ width: 120, height: 120, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {selectedSpeaker.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {selectedSpeaker.bio}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="h6" sx={{ mb: 2 }}>Talks</Typography>
              {selectedSpeaker.talks.map(talk => (
                <Card key={talk.id} sx={{ mb: 2, p: 2 }}>
                  <Typography variant="subtitle1">{talk.title}</Typography>
                  <Typography color="text.secondary">
                    {talk.time} | {talk.room}
                  </Typography>
                </Card>
              ))}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default Speakers;
