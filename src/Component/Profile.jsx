import React, { useContext } from "react";
import { Box, Typography, Button, Avatar, Divider } from "@mui/material";
import { Settings, ExitToApp, ContactMail } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirect
import Authcontext from "./Context/Authcontext";

const Profile = () => {
  const { user, logout } = useContext(Authcontext); // Use the `logout` function from context
  const navigate = useNavigate(); // Hook to navigate to another page

  if (!user) {
    return <Typography>No user data available</Typography>;
  }

  const handleLogout = () => {
    logout(); // Call logout to clear user data
    navigate("/login"); // Redirect user to the login page
  };

  const firstNameInitial = user.name.charAt(0).toUpperCase();

  return (
    <Box
      sx={{
        padding: 4,
        textAlign: "center",
        margin: "auto",
        maxWidth: "500px",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
        borderRadius: 3,
        background: "linear-gradient(135deg, #ececec, #ffffff)",
      }}
    >
      {/* Profile Picture and Name */}
      <Avatar
        sx={{
          width: 100,
          height: 100,
          margin: "0 auto",
          backgroundColor: "#3f51b5",
          color: "#fff",
          fontSize: 36,
        }}
      >
        {firstNameInitial}
      </Avatar>
      <Typography variant="h5" sx={{ marginTop: 2, fontWeight: "bold" }}>
        {user.name}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {user.email}
      </Typography>

      <Divider sx={{ marginY: 3 }} />

      {/* Options */}
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        startIcon={<Settings />}
        sx={{
          marginBottom: 2,
          textTransform: "none",
          borderColor: "#3f51b5",
          color: "#3f51b5",
        }}
        onClick={() => alert("Navigate to settings")}
      >
        Settings
      </Button>
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        startIcon={<ContactMail />}
        sx={{
          marginBottom: 2,
          textTransform: "none",
          borderColor: "#3f51b5",
          color: "#3f51b5",
        }}
        onClick={() => alert("Navigate to contact us")}
      >
        Contact Us
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="error"
        startIcon={<ExitToApp />}
        sx={{
          textTransform: "none",
        }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
