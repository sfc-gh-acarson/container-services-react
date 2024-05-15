//import React from 'react';
//import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Typography, Box, Fab } from '@mui/material';
//import { styled, useTheme } from '@mui/material/styles';
//import InboxIcon from '@mui/icons-material/MoveToInbox';
//import MailIcon from '@mui/icons-material/Mail';
//import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
//import ChevronRightIcon from '@mui/icons-material/ChevronRight';
//import MenuIcon from '@mui/icons-material/Menu';
//import companyLogo from './sf.png'; // Adjust the path accordingly
//
//const drawerWidth = 240;
//
//const openedMixin = (theme) => ({
//  width: drawerWidth,
//  transition: theme.transitions.create('width', {
//    easing: theme.transitions.easing.sharp,
//    duration: theme.transitions.duration.enteringScreen,
//  }),
//  overflowX: 'hidden',
//});
//
//const closedMixin = (theme) => ({
//  transition: theme.transitions.create('width', {
//    easing: theme.transitions.easing.sharp,
//    duration: theme.transitions.duration.leavingScreen,
//  }),
//  overflowX: 'hidden',
//  width: `calc(${theme.spacing(7)} + 1px)`,
//  [theme.breakpoints.up('sm')]: {
//    width: `calc(${theme.spacing(9)} + 1px)`,
//  },
//});
//
//const DrawerHeader1 = styled('div')(({ theme }) => ({
//  display: 'flex',
//  alignItems: 'center',
//  padding: theme.spacing(0, 1),
//  ...theme.mixins.toolbar,
//  justifyContent: 'space-between',
//}));
//
//const MiniVariantDrawer1 = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//  ({ theme, open }) => ({
//    width: drawerWidth,
//    flexShrink: 0,
//    whiteSpace: 'nowrap',
//    boxSizing: 'border-box',
//    ...(open && {
//      ...openedMixin(theme),
//      '& .MuiDrawer-paper': openedMixin(theme),
//    }),
//    ...(!open && {
//      ...closedMixin(theme),
//      '& .MuiDrawer-paper': closedMixin(theme),
//    }),
//  }),
//);
//
//const ReopenButton = styled(Fab)(({ theme }) => ({
//  position: 'fixed',
//  bottom: theme.spacing(2),
//  left: theme.spacing(2),
//}));
//
//function Sidebar({ open, setOpen }) {
//  const theme = useTheme();
//
//  return (
//    <>
//      <MiniVariantDrawer1 variant="permanent" open={open}>
//        <DrawerHeader1 >
//          <Box display="flex" alignItems="center">
//            <img src={companyLogo} alt="Company Logo" style={{ height: 40, marginRight: theme.spacing(1) }} />
//          </Box>
//          <IconButton onClick={() => setOpen(false)}>
//            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//          </IconButton>
//        </DrawerHeader1 >
//        <Divider />
//        <List>
//          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//            <ListItem button key={text}>
//              <ListItemIcon>
//                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//              </ListItemIcon>
//              <ListItemText primary={text} />
//            </ListItem>
//          ))}
//        </List>
//      </MiniVariantDrawer1>
//      {!open && (
//        <ReopenButton color="primary" aria-label="open drawer" onClick={() => setOpen(true)}>
//          <MenuIcon />
//        </ReopenButton>
//      )}
//    </>
//  );
//}
//
//export default Sidebar;