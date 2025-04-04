'use client';
import { Box, Typography, Button } from '@mui/material';

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
        CASE FINDER
      </Typography>
      <Box>
        <Button sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.95rem', textTransform: 'none' }}>
          How It Works
        </Button>
        <Button sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.95rem', textTransform: 'none' }}>
          Sign In
        </Button>
      </Box>
    </Box>
  );
}
