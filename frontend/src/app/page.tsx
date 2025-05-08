'use client';

// Imported components and hooks
import { Box, Typography, Grid, CircularProgress, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FeatureCard from '../components/FeatureCard';
import { MunicipalCard } from '../components/MunicipalCard';
import { getMunicipals } from '../services/municipalService';
import { Municipal } from '../types/municipal';
import { MunicipalGraph } from '../utils/MunicipalGraph';

export default function HomePage() {
  // declaring state for components
  const [municipals, setMunicipals] = useState<Municipal[]>([]);
  const [displayedMunicipals, setDisplayedMunicipals] = useState<Municipal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(1);
  const [municipalGraph, setMunicipalGraph] = useState<MunicipalGraph | null>(null);
  const itemsPerPage = 4;

  // Rendering component client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize the graph when data is first loaded
  useEffect(() => {
    const initializeGraph = async () => {
      try {
        setLoading(true);
        const data = await getMunicipals();
        setMunicipals(data); // Set the municipals state
        
        const graph = new MunicipalGraph();
        
        // Add all municipals to the graph
        data.forEach(municipal => graph.addNode(municipal));
        
        // Build relationships between nodes
        graph.buildEdges();
        
        setMunicipalGraph(graph);
      } catch (error) {
        console.error('Failed to initialize graph:', error);
        setError('Failed to load municipal records. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    initializeGraph();
  }, []);

  // Update municipals on current page
  useEffect(() => {
    if (municipals.length > 0) {
      const start = 0;
      const end = page * itemsPerPage;
      setDisplayedMunicipals(municipals.slice(start, end));
    }
  }, [municipals, page]);

  // Handle search and update with resulting codes
  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    setPage(1);
    
    try {
      if (!municipalGraph) {
        throw new Error('Search system not initialized');
      }
      
      // Find relevant codes using our graph-based search
      const relevantCodes = municipalGraph.findRelevantCodes(searchQuery);
      
      setMunicipals(relevantCodes);
      setHasSearched(true);
    } catch (err) {
      setError('Failed to search municipal records');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Increment page number for more results
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // Prevent server-side rendering
  if (!mounted) {
    return null;
  }

  // Displaying frontend
  return (
    <Box px={2} py={4}>
      <Header />

      {/*Root section and Search Bar*/}
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
        <SearchBar onSearch={handleSearch} />
      </Box>

      {/*Spinner for wait*/}
      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {/*Error*/}
      {error && (
        <Box textAlign="center" mt={4}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      {/*Search results*/}
      {hasSearched && !loading && (
        <Box mt={6} maxWidth="1400px" mx="auto">
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Georgia, serif',
              fontWeight: 700,
              fontSize: '1.5rem',
              mb: 4,
              textAlign: 'center',
            }}
          >
            Search Results
          </Typography>

          {/*Municipal cards*/}
          <Grid 
            container 
            spacing={3}
            sx={{
              '& > *': {
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              },
            }}
          >
            {displayedMunicipals.map((municipal) => (
              <Grid item xs={12} md={6} key={municipal._id}>
                <MunicipalCard municipal={municipal} />
              </Grid>
            ))}
          </Grid>

          {/*Load more*/}
          {displayedMunicipals.length < municipals.length && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                variant="contained"
                onClick={handleLoadMore}
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
                Load More
              </Button>
            </Box>
          )}
        </Box>
      )}

      {/*Default cards before search*/}
      {!hasSearched && (
        <>
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

          {/*Bottom section*/}
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
        </>
      )}
    </Box>
  );
}
