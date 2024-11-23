import React from 'react';
import { Box, Typography, Rating, Avatar, Divider, Button } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Lawyer() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      borderRadius={4}
      p={6}
      sx={{
        backgroundImage: 'url(/as.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gap={6}
        width="100%"
        maxWidth={800}
        bgcolor="rgba(255, 255, 255, 0.9)"
        borderRadius={4}
        p={6}
      >
        {/* Left Side */}
        <Box>
          <Avatar
            alt="Lawyer"
            src="/me.jpg"
            sx={{ width: 150, height: 150, borderRadius: '50%' }}
          />
          <Typography variant="h4" component="h2" mt={2} fontWeight={600}>
            John Doe
          </Typography>
          <Typography variant="body1" component="p" mt={1} color="text.secondary">
            johndoe@example.com
          </Typography>
          <Typography variant="body1" component="p" mt={1} color="text.secondary">
            15 Years of Experience
          </Typography>
          <Rating
            name="read-only"
            value={5}
            readOnly
            sx={{ mt: 2, '& .MuiRating-icon': { fontSize: '1.75rem' } }}
          />
        </Box>

        {/* Right Side */}
        <Box>
          <Typography variant="h3" component="h1" mb={2} fontWeight={600}>
            Lawyer
          </Typography>
          <Typography variant="h5" mb={1} color="primary.main">
            My Hour is $60
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box>
            <Typography variant="body1" component="p" mb={1}>
              This is a description of myself. I am a professional lawyer with
              extensive experience in the field. I am committed to providing
              excellent service to my clients.
            </Typography>
            <Typography variant="body1" component="p" mb={1}>
              I have a strong track record of success in various legal matters
              and can help you navigate the complexities of the legal system.
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="subtitle1" component="p" color="text.secondary">
              Rank
            </Typography>
            <Rating
              name="read-only"
              value={4.5}
              readOnly
              precision={0.5}
              sx={{ '& .MuiRating-icon': { fontSize: '1.75rem' } }}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<CallIcon />}
              sx={{ minHeight: 50, minWidth: 150 }}
            >
              Contact
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PersonAddIcon />}
              sx={{ minHeight: 50, minWidth: 150 }}
            >
              Hire
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}