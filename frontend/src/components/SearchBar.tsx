'use client';
import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

//Props
interface SearchBarProps {
  onSearch: (query: string) => void;
}

// Search bar component
export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mt: 4,
        maxWidth: '600px',
        mx: 'auto',
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Describe your situation or question..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            bgcolor: 'white',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2c3e50',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2c3e50',
            },
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{
          bgcolor: '#2c3e50',
          '&:hover': {
            bgcolor: '#34495e',
          },
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          px: 4,
          py: 1.5,
        }}
      >
        Search
      </Button>
    </Box>
  );
}
