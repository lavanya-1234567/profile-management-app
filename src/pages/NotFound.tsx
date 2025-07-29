import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          mt: 10,
          p: 5,
          textAlign: 'center',
          borderRadius: 3,
          backgroundColor: '#fdfdfd',
        }}
        role="alert"
      >
        <Typography variant="h2" component="h1" color="error" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ textTransform: 'none', px: 4, py: 1 }}
        >
          Go to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFound;
