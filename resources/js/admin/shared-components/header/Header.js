import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

// const pages = ['Products', 'Pricing', 'Blog'];


const Header = () => {
    const navigator = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const CheckSettingClick = (e) =>{
    if(e.target.innerText == 'Logout'){
        localStorage.clear();
        navigator('/admin/login');
    }
  };

  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{justifyContent:"space-between"}} >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'flex', md: 'flex' } ,cursor:"pointer"}}
            onClick={()=>{
                navigate("/admin");
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 0, float:"right"}} >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />
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
            <MenuItem key={"profile"} onClick={()=>{navigate('/admin/profile')}}>
                <Typography textAlign="center">{"Profile"}</Typography>
            </MenuItem>
            <MenuItem key={"questions"} onClick={()=>{navigate('/admin/question')}}>
                <Typography textAlign="center">{"Questions"}</Typography>
            </MenuItem>
            <MenuItem key={"users"} onClick={()=>{navigate('/admin/users')}}>
                <Typography textAlign="center">{"Users"}</Typography>
            </MenuItem>
            <MenuItem key={"changepassword"} onClick={CheckSettingClick}>
                <Typography textAlign="center">{"Change Password"}</Typography>
            </MenuItem>
            <MenuItem key={"logout"} onClick={CheckSettingClick}>
                <Typography textAlign="center">{"Logout"}</Typography>
            </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
