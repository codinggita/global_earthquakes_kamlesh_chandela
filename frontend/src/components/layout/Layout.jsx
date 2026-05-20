import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh', 
        backgroundColor: 'background.default',
        overflow: 'hidden' // Prevent global scroll, we'll scroll the content area
      }}
    >
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%', md: 'calc(100% - 240px)' }, // Sidebar is 240px
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative'
        }}
        id="scrollable-main-area"
      >
        {/* Navbar floats over the content */}
        <Box sx={{ position: 'sticky', top: 0, zIndex: 50, pt: { xs: 1, md: 3 }, px: { xs: 1, md: 3 } }}>
          <Navbar onToggleSidebar={handleToggleSidebar} />
        </Box>
        
        <Box 
          className="animate-slide-up"
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, md: 4 },
            width: '100%',
            maxWidth: '1600px',
            mx: 'auto'
          }}
        >
          <Outlet />
        </Box>
        
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
