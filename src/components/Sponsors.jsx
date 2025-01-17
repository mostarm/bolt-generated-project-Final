import { Box, Typography, Card, Grid, Tooltip } from '@mui/material';
import { sponsors } from '../data/sponsors';

const SponsorCategory = ({ title, sponsors, logoHeight }) => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h5" sx={{ mb: 3, color: 'primary.main' }}>
      {title} Sponsors
    </Typography>
    <Grid container spacing={4}>
      {sponsors.map(sponsor => (
        <Grid item xs={12} sm={6} md={4} key={sponsor.id}>
          <Tooltip title={`Visit ${sponsor.name}`} arrow>
            <Card
              sx={{
                p: 3,
                height: '100%',
                minHeight: 280,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out',
                  boxShadow: 3
                }
              }}
              onClick={() => window.open(sponsor.website, '_blank')}
            >
              <Box
                sx={{
                  height: logoHeight,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                  p: 2
                }}
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              </Box>
              <Box sx={{ 
                mt: 'auto', 
                textAlign: 'center',
                width: '100%'
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 1,
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  {sponsor.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: '0.9rem',
                    lineHeight: 1.4
                  }}
                >
                  {sponsor.description}
                </Typography>
              </Box>
            </Card>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default function Sponsors() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 6,
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        Our Sponsors
      </Typography>
      
      <SponsorCategory
        title="Platinum"
        sponsors={sponsors.platinum}
        logoHeight={120}
      />
      
      <SponsorCategory
        title="Gold"
        sponsors={sponsors.gold}
        logoHeight={100}
      />
      
      <SponsorCategory
        title="Silver"
        sponsors={sponsors.silver}
        logoHeight={90}
      />
    </Box>
  );
}
