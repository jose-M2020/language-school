import { Box, Button, Drawer, useMediaQuery } from '@mui/material';
import React, { useState } from 'react'
import { tokens } from '../../theme';
import Header from './components/Header';
import Sidebar from './components/Sidebar'

const DashboardLayout = ({children}) => {
  const colors = tokens();
  const isMobil = useMediaQuery('(max-width:600px)');
  const [stateMobile, setStateMobile] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setStateMobile(open);
  };

  return (
    <Box sx={{display: 'flex', position: 'relative'}}>
      {isMobil ? (
        <>
          <Button onClick={toggleDrawer(true)}>left</Button>
          <Drawer
                anchor='left'
                open={stateMobile}
                onClose={toggleDrawer(false)}
              >
            <Sidebar />
          </Drawer>
        </>
      ) : (
        <Sidebar />
      )}
      <main>
        <Box px={3}>
          <Header title="PROJECTS" subtitle="Managing projects" />
            {children}
        </Box>
      </main>
    </Box>
  )
}

export default DashboardLayout