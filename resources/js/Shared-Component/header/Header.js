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

const pages = [
                [{handle:'about-us'},{label:'About Us'}],
                [{handle:'faqs'},{label:'FAQs'}],
                [{handle:'contact-us'},{label:'Contact Us'}]
            ];

const Header = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [userLogin, setUserLogin] = React.useState("");

    React.useEffect(()=>{
        setUserLogin(localStorage.getItem("user_token"));
    });

    const navigate = useNavigate();

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

    const logOut = () =>{
        localStorage.removeItem("user_token");
        navigate("/login");
    }

  return (
<AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            onClick={()=>{ navigate("/");}}
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page,index) =>
                <MenuItem key={page[1].label} onClick={()=>{handleCloseNavMenu; navigate("/"+page[0].handle);}}>
                  <Typography textAlign="center">{page[1].label}</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Typography
            onClick={()=>{ navigate("/");}}
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page[1].label}
                onClick={()=>{handleCloseNavMenu; navigate("/"+page[0].handle);}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page[1].label}
              </Button>
            ))}
          </Box>

          {userLogin && <Box sx={{ flexGrow: 0 }}>
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
                <MenuItem key={"profile"} onClick={()=>{navigate("/profile")}}>
                  <Typography textAlign="center">{"Profile"}</Typography>
                </MenuItem>
                <MenuItem key={"changepassword"} onClick={()=>{navigate("/changepassword")}}>
                  <Typography textAlign="center">{"Change Password"}</Typography>
                </MenuItem>
                <MenuItem key={"logout"} onClick={logOut}>
                  <Typography textAlign="center">{"Logout"}</Typography>
                </MenuItem>
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
