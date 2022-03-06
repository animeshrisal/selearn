import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import { useAuthentication, useSocket } from '../../shared/context';
import { useNavigate } from 'react-router-dom';



const NavBar = (props) => {
  let navigate = useNavigate();
  const { dispatch } = useAuthentication();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { disconnect } = useSocket();

  const settings = [
    {
      title: 'Classes', method: () =>
        goToClassroom()

    },
    {
      title: 'Logout', method: () => {
        handleCloseUserMenu()
      }
    }
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const goToClassroom = () => {
    navigate(`classroom`)
  }


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting.title} onClick={setting.method}>
                <Typography textAlign="center">{setting.title}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>

  )
}

export default NavBar