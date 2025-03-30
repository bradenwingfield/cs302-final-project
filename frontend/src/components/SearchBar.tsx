'use client';
import { Box, TextField, Button } from '@mui/material';

export default function SearchBar() {
  return (
    <Box display="flex" mt={4} maxWidth="800px" mx="auto">
      <TextField
        fullWidth
        placeholder="Describe a case or situation"
        variant="outlined"
        sx={{
          backgroundColor: 'white',
          borderRadius: 1,
          '& input': {
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
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
          textTransform: 'uppercase',
          '&:hover': {
            backgroundColor: '#203830',
          },
        }}
      >
        SEARCH
      </Button>
    </Box>
  );
}
