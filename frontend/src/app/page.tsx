'use client';
import { Box, Typography, Grid } from '@mui/material';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FeatureCard from '../components/FeatureCard';

export default function HomePage() {
  return (
    <Box px={2} py={4}>
      <Header />

      <Box textAlign="center" mt={10}>
        <Typography
          sx={{
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            fontSize: '2.75rem',
            lineHeight: 1.2,
          }}
        >
          Find similar cases<br />and relevant policies
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '1rem',
            mt: 2,
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          Input a case or situation and receive references to similar cases and relevant policies.
        </Typography>
        <SearchBar />
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        mt={6}
        mx="auto"
        width="100%"
        maxWidth="720px"
        gap={3}
      >
        <FeatureCard
          title="Similar Cases"
          description="Quickly retrieve comparable precedents"
        />
        <FeatureCard
          title="Relevant Policies"
          description="Access pertinent policy documents"
        />
      </Box>

      <Box textAlign="center" mt={10} p={4} bgcolor="#efe1c9">
        <Typography
          sx={{
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            fontSize: '1.5rem',
          }}
        >
          For professionals and students
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '1rem',
            mt: 1,
          }}
        >
          Quickly retrieve comparable precedents<br />
          and policy documents
        </Typography>
      </Box>
    </Box>
  );
}
