'use client';
import { Paper, Typography } from '@mui/material';

interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <Paper elevation={2} sx={{ p: 3, width: 300, backgroundColor: '#f4e3c4' }}>
      <Typography
        sx={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1.2rem' }}
      >
        {title}
      </Typography>
      <Typography
        sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, mt: 1 }}
      >
        {description}
      </Typography>
    </Paper>
  );
}
