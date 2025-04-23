'use client';
import { Box, TextField, Button } from '@mui/material';

export default function SearchBar() {
  return (
    <Box display="flex" mt={5} maxWidth="720px" mx="auto">
      <TextField
        fullWidth
        placeholder="Search Knoxville laws or describe a local situation"
        variant="outlined"
        sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          fontSize: '1rem',
          '& input': {
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '1rem',
            padding: '14px',
          },
        }}
      />
      <Button
        variant="contained"
        sx={{
          ml: 2,
          backgroundColor: '#304F48',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '0.95rem',
          px: 4,
          borderRadius: '8px',
          textTransform: 'uppercase',
          '&:hover': {
            backgroundColor: '#203830',
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
}
