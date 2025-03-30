'use client';
import { Paper, Typography } from '@mui/material';

interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <Paper
      elevation={1}
      sx={{
        width: 345,
        height: 140,
        p: 3,
        borderRadius: '12px',
        backgroundColor: '#efe1c9',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Georgia, serif',
          fontWeight: 700,
          fontSize: '1.25rem',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '0.95rem',
          mt: 1,
        }}
      >
        {description}
      </Typography>
    </Paper>
  );
}
