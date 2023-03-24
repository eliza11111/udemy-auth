import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <NavLink to="/">
            <Box
              component="img"
              sx={{
                height: 35,
                marginRight: 70,
              }}
              alt="Your logo."
              src={Logo}
            />
          </NavLink>

          <Typography variant="body2" sx={{ margin: 1 }}>
            Udemy Business
          </Typography>
          <Typography variant="body2" sx={{ margin: 1 }}>
            Преподавайте на Udemy
          </Typography>
          <ShoppingCartOutlinedIcon />
          <NavLink
            to="/login"
            style={{
              textDecoration: "none",
              color: "#000",
              fontSize: "15px",
            }}
          >
            <Button sx={{ margin: 2 }} variant="outlined" color="inherit">
              Войти
            </Button>
          </NavLink>

          <NavLink
            to="/register"
            style={{
              textDecoration: "none",
              color: "#000",
              fontSize: "15px",
            }}
          >
            <Button variant="outlined" color="inherit">
              Регистрация
            </Button>
          </NavLink>
          <LanguageIcon sx={{ margin: 1 }} />
          <NavLink
            to="/logout"
            style={{
              textDecoration: "none",
              color: "#000",
              fontSize: "15px",
            }}
          >
            <IconButton color="secondary">
              <LogoutIcon />
            </IconButton>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
