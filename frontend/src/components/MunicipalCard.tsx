import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { Municipal } from '../types/municipal';

//Props
interface MunicipalCardProps {
  municipal: Municipal;
}

// Card component used to display municipal codes
export const MunicipalCard = ({ municipal }: MunicipalCardProps) => {
  return (
    <Card 
      sx={{ 
        mb: 2,
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography 
            variant="h6" 
            component="div"
            sx={{
              fontFamily: 'Georgia, serif',
              fontWeight: 700,
              fontSize: '1.25rem',
              color: '#304F48',
            }}
          >
            {municipal.title}
          </Typography>
          <Typography 
            color="text.secondary"
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#666',
            }}
          >
            Section {municipal.section}
          </Typography>
        </Box>
        <Typography 
          variant="subtitle1" 
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '0.95rem',
            color: '#666',
            mb: 2,
          }}
        >
          Chapter: {municipal.chapter}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 2,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: 1.6,
            color: '#333',
          }}
        >
          {municipal.summary}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {municipal.tags.map((tag, index) => (
            <Chip 
              key={index} 
              label={tag} 
              size="small"
              sx={{
                backgroundColor: '#efe1c9',
                color: '#304F48',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#e0d0b0',
                },
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}; 