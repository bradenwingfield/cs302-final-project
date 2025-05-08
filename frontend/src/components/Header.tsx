'use client';
import { Box, Typography, Button } from '@mui/material';

// Header component
export default function Header() {
  return (
    <Box display="flex" justifyContent="space-between" p={3}>
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontSize: '1rem',
        }}
      >
        Knox Lookup
      </Typography>
      <Box>
        <Button sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.95rem', textTransform: 'none' }}>
          How It Works
        </Button>
        <Button sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.95rem', textTransform: 'none' }}>
          Resources
        </Button>
      </Box>
    </Box>
  );
}
