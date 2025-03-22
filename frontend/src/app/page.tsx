"use client";
import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

export default function Home() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:5000/api/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setResults(data.matches);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Case-Based Reference System
      </Typography>
      <TextField
        label="Describe your case"
        multiline
        fullWidth
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Box mt={2}>
        <Button variant="contained" onClick={handleSubmit}>
          Find Similar Cases
        </Button>
      </Box>

      {/* Placeholder for results */}
      <Box mt={4}>
        {results.map((r: any, idx: number) => (
          <Box key={idx} sx={{ mb: 2 }}>
            <Typography variant="h6">{r.title}</Typography>
            <Typography variant="body2">{r.summary}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
