import React from "react";
import IPageProps from "../interfaces/page";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import logging from "../config/logging";
import { Alert, Typography, Button } from "@mui/material";

const LogOutPage: React.FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();

  const Logout = () => {
    auth
      .signOut()
      .then(() => navigate("/login"))
      .catch((error) => logging.error(error));
  };

  return (
    <Alert
      sx={{ size: "small", marginRight: 30, marginLeft: 30, marginTop: 5 }}
      severity="info"
    >
      <Typography fontSize="16px" marginBottom={1}>
        Are you sure you want to logout?
      </Typography>
      <Button
        sx={{ margin: 2 }}
        variant="outlined"
        color="secondary"
        onClick={() => Logout()}
      >
        Logout
      </Button>
      <Button variant="outlined" color="error" onClick={() => navigate("/")}>
        Cancel
      </Button>
    </Alert>
  );
};

export default LogOutPage;
