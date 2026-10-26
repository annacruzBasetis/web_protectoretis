import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";

// Modals centralitzats
import { LoginModal } from "./LoginModal";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { Link } from "react-router-dom";
import { useAuth } from '../services/useAuth'


const pages = [
  { name: "Adopta", path: "/adopt" },
  { name: "Nosaltres", path: "/about" },
  { name: "Es busca", path: "/missing" },
  { name: "Ajuda", path: "/help" },
  { name: "Voluntariat", path: "/volunteering" },
  { name: "Dóna", path: "/donate" },
  { name: "Fes-te soci/a", path: "/join" },
  { name: "Contacte", path: "/contact" },
];

// Opcions privades per a usuaris autenticats
const privateSettings = [
  { name: "Perfil", path: "/profile" },
  { name: "Account", path: "/account" },
  { name: "Zona d'administrador", path: "/dashboard" },
  { name: "Surt", path: "/logout" },
];

function Header() {
  const navigate = useNavigate();

  // Estat d'autenticació 
  // TODO: ajustar segons AuthContext
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  // Estats per als modals d'autenticació
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isForgotOpen, setIsForgotOpen] = React.useState(false);
const settings = [
  { name: "Profile", path: "/profile"},
  { name: "Account", path: "/account"},
  { name: "Dashboard", path: "/user/dashboard"}
];

function Header() {

  const { user, login, logout } = useAuth();
  
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Clic a una opció
  const handleUserMenuItemClick = (settingName: string, path?: string) => {
    handleCloseUserMenu();
    if (settingName === "Accés Admin") {
      setIsLoginOpen(true);
    } else if (settingName === "Surt") {
      setIsLoggedIn(false);
      navigate("/");
    } else if (path) {
      navigate(path);
    }
  };

  // Transicions entre Modals Login i Recuperació de contrasenya
  const handleOpenForgot = () => {
    setIsLoginOpen(false);
    setIsForgotOpen(true);
  };

  const handleBackToLogin = () => {
    setIsForgotOpen(false);
    setIsLoginOpen(true);
  };

  const handleLoginSuccess = (userData: { email: string }) => {
    console.log("Sessió iniciada per:", userData.email);
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  // Només es mostra "Accés Admin" si no s'ha iniciat sessió; en cas contrari, es mostren les privades
  const visibleSettings = isLoggedIn
    ? privateSettings
    : [{ name: "Accés Admin" }];

  return (
    <header>
      <AppBar
        position="static"
        sx={{ borderRadius: "0 0 1rem 1rem", backgroundColor: "primary.main" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Proaniplan
              </Typography>
            </Link>

            {/* Menú en pantalles petites */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map(({ name, path }) => (
                  <MenuItem key={name} onClick={handleCloseNavMenu}>
                    <Link to={path} style={{ textDecoration: "none", color: "inherit" }}>
                      <Typography sx={{ textAlign: "center" }}>
                        {name}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h2"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "text.primary",
                textDecoration: "none",
              }}
            >
              Proaniplan
            </Typography>

            {/* Navegació escriptori */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(({ name, path }) => (
                <Link key={name} to={path} style={{ textDecoration: "none" }}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {name}
                  </Button>
                </Link>
              ))}
            </Box>

            {/* Menú d'usuari / Avatar */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {visibleSettings.map(({ name, path }) => (
                  <MenuItem key={name} onClick={() => handleUserMenuItemClick(name, path)}>
                    <Typography sx={{ textAlign: "center", width: "100%" }}>
                      {name}
                    </Typography>
                {settings.map(({name, path}) => (
                  <MenuItem key={name} onClick={handleCloseNavMenu}>
                    <Link to={path}>
                      <Typography sx={{ textAlign: "center" }}>
                        {name}
                      </Typography>
                    </Link>
                    
                  </MenuItem>
                ))}
                            <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2, alignItems: "center" }}>
               {user ? (
                  <Button variant="contained" color="error" onClick={logout}>
                    Logout
                  </Button>
                ) : (
                  <Button variant="contained" color="primary" onClick={login}>
                    Login
                  </Button>
                )}
            </Box>
              </Menu>
            </Box> 

          </Toolbar>
        </Container>
      </AppBar>

      {/* Modal Login */}
      <LoginModal
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onForgotPasswordClick={handleOpenForgot}
      />

      {/* Modal Recuperació de contrasenya */}
      <ForgotPasswordModal
        open={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
        onBackToLogin={handleBackToLogin}
      />
     
    </header>
  );
}

export default Header;