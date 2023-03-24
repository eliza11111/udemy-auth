import { Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import IPageProps from "../interfaces/page";
import logging from "../config/logging";
import ErrorText from "../ErrorText";

// Sign In Form
export const LogIn: React.FunctionComponent<IPageProps> = (props) => {
  const [login, setLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const signInWithEmailAndPassword = () => {
    if (error !== "") setError("");

    setLogin(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        logging.info(result);
        navigate("/");
      })
      .catch((error) => {
        logging.error(error);
        setLogin(false);
        setError("");
      });
  };

  return (
    <Grid display="flex" justifyContent="center" alignItems="center">
      <form>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ alignItems: "center", margin: 5 }}
        >
          Вход в учетную запись Udemy
          <TextField
            margin="normal"
            size="small"
            type="email"
            id="email"
            label="Адрес электронной почты"
            variant="outlined"
            fullWidth
            sx={{ display: "block", marginBottom: 2 }}
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
          />
          <TextField
            margin="normal"
            size="small"
            type="password"
            id="password"
            label="Пароль"
            variant="outlined"
            fullWidth
            sx={{ display: "block", marginBottom: 3 }}
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
          />
          <ButtonGroup size="large" color="secondary">
            <Button
              variant="contained"
              disabled={login}
              type="submit"
              onClick={() => signInWithEmailAndPassword()}
            >
              Войти
            </Button>
          </ButtonGroup>
          <small>
            <p>
              У вас еще нет учетной записи?
              <Link to="/register">Зарегистрироваться</Link>
            </p>
          </small>
          <small>
            <p>
              Забыли пароль?
              <Link to="/forget">Здесь</Link>
            </p>
          </small>
          <ErrorText error={error} />
        </Typography>
      </form>
    </Grid>
  );
};

//

export default LogIn;
