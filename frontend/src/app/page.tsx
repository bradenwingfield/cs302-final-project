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
        Search Knoxville Municipal Codes

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
          Type in a topic or question to explore official Knoxville ordinances and local regulations.
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
          title="Knoxville Ordinances"
          description="Explore the official municipal code for Knoxville by topic or keyword."
        />
        <FeatureCard
          title="City Policies"
          description="Access key rules and regulations that shape daily life in Knoxville."
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
          Know your city, understand your laws.
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '1rem',
            mt: 1,
          }}
        >
          Whether you're a student, a resident, or a local business owner, <br/>
          quickly find the municipal codes that matter to you.
        </Typography>
      </Box>
    </Box>
  );
}
