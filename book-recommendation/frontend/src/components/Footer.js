import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Footer() {
  return (
    <Box sx={{ 
      backgroundColor: 'black',
      color: '#fff',
      py: 3,
      px: 2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      }}>
      <Typography variant="body2" sx={{ mb: 1 }}>© 2023 Book Recommendation System</Typography>
      <Typography variant="caption" sx={{ mb: 1 }}>Made by coders</Typography>
      <Typography variant="caption">Powered by React and Material UI</Typography>
      <Box sx={{ mt: 2 }}>
        <Link href="#" underline="hover" sx={{ mr: 1 }}>Privacy Policy</Link>
        <Link href="#" underline="hover" sx={{ mr: 1 }}>Terms of Use</Link>
        <Link href="#" underline="hover">Contact Us</Link>
      </Box>
    </Box>
  );
}

export default Footer;

