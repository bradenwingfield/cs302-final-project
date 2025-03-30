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
            fontSize: '2.5rem',
          }}
        >
          Find similar cases<br />and relevant policies
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            mt: 2,
          }}
        >
          Input a case or situation and receive references to similar cases and relevant policies.
        </Typography>
        <SearchBar />
      </Box>

      <Grid container spacing={4} justifyContent="center" mt={6}>
        <Grid item>
          <FeatureCard
            title="Similar Cases"
            description="Quickly retrieve comparable precedents"
          />
        </Grid>
        <Grid item>
          <FeatureCard
            title="Relevant Policies"
            description="Access pertinent policy documents"
          />
        </Grid>
      </Grid>

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
