import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DefaultApp from './DefaultApp';
import CollapsibleTable from './CollapsibleTable';
import BasicTable from './BasicTable';
import Pagination from './Pagination';
import ModalForm from './ModalForm';
import Sidebar from './SidebarOld';
//import Sidebar from './Sidebar';
import { CssBaseline, Box, Toolbar, IconButton, AppBar, Typography } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';


function SideBarWrapper(){
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>        
      </Box>
    </Box>
  );
}
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const baseURL = window.location.href;
console.log('baseURL: ' + baseURL)

function App() {
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <main>                
        {/*<SideBarWrapper open={open} setOpen={setOpen} />*/}
        <Sidebar />
            <div style={{ marginRight: 35 + 'em', marginLeft: 35 + 'em', marginTop: 5 + 'em', marginBottom: 5 + 'em' }}>
              <ModalForm />
            </div>
            <div style={{ marginRight: 35 + 'em', marginLeft: 35 + 'em', marginTop: 5 + 'em', marginBottom: 5 + 'em' }}>
              <BasicTable />
            </div>
            <div style={{ marginRight: 35 + 'em', marginLeft: 35 + 'em', marginTop: 5 + 'em', marginBottom: 5 + 'em' }}>
              <Pagination />
            </div>
            <div style={{ marginRight: 35 + 'em', marginLeft: 35 + 'em', marginTop: 5 + 'em', marginBottom: 5 + 'em' }}>
              <CollapsibleTable />
            </div>          

        </main>
      </ThemeProvider>

    </div>
  );

}

export default App;
