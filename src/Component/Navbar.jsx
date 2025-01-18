import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Drawer,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  ShoppingCart,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Authcontext from "./Context/Authcontext";
import Bill from "./Product/Bill";

const Navbar = ({ newquantity }) => {
  const { user, isLogin, logout } = useContext(Authcontext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="sticky"
        sx={{
          background: "#fff",
        }}
      >
        <Toolbar className="flex justify-between items-center px-4 py-2">
          {/* Logo and Desktop Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Typography
              variant="h6"
              className="font-extrabold text-2xl tracking-wide text-gray-800"
            >
              <Link
                to="/"
                className="hover:text-blue-600 transition duration-300"
              >
                Ecom
              </Link>
            </Typography>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6">
              <Link
                to="/"
                className="text-gray-700 text-lg hover:text-blue-600 transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 text-lg hover:text-blue-600 transition duration-300"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 text-lg hover:text-blue-600 transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Side (Cart & User Avatar/Login) */}
          <div className="flex items-center space-x-6">
            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <MenuIcon className="text-gray-700" />
              </IconButton>
            </div>

            {/* Cart Icon */}
            <IconButton
              color="inherit"
              onClick={() => setOpenDrawer(true)}
              className="relative"
            >
              <Badge badgeContent={newquantity} color="secondary">
                <ShoppingCart className="text-gray-700" />
              </Badge>
            </IconButton>

            {/* User Avatar or Login */}
            {isLogin ? (
              <div>
                <IconButton
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                  className="flex items-center gap-2"
                >
                  {user && user.name ? (
                    <Avatar className="bg-blue-500 text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  ) : (
                    <Avatar className="bg-blue-500 text-white">U</Avatar>
                  )}
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                  MenuListProps={{ "aria-labelledby": "basic-button" }}
                >
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleMenuClose}
                  >
                    My Profile
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/myorder"
                    onClick={handleMenuClose}
                  >
                    My Orders
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                      handleMenuClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 text-lg hover:text-blue-600 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="bg-white w-3/4 max-w-sm h-full p-4">
            <div className="flex justify-between items-center mb-6">
              <Typography
                variant="h6"
                className="font-bold text-gray-800 text-lg"
              >
                Menu
              </Typography>
              <IconButton onClick={() => setMobileMenuOpen(false)}>
                <CloseIcon className="text-gray-600" />
              </IconButton>
            </div>
            <nav className="space-y-4">
              <Link
                to="/"
                className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition duration-300"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition duration-300"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div className="w-85 h-full flex flex-col">
          <div className="flex justify-between items-center p-4 bg-white text-gray">
            <Typography variant="h6" className="font-bold">
              Shopping Cart
            </Typography>
            <IconButton onClick={() => setOpenDrawer(false)}>
              <CloseIcon className="text-gray" />
            </IconButton>
          </div>
          <div className="p-4 overflow-y-auto flex-grow bg-gray-50">
            <Bill />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
