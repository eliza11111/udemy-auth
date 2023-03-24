import React, { useState } from "react";
import { FC } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IPageProps from "../interfaces/page";
import { auth } from "../config/firebase";
import logging from "../config/logging";
import ErrorText from "../../Auth/ErrorText/index";

const Register: FC<IPageProps> = (props) => {
  const [registering, setRegistering] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const signUpWithEmailAndPassword = () => {
    if (password !== confirm) {
      setError("Please make sure your password match.");
      return;
    }
    if (error !== "") setError("");

    setRegistering(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        logging.info(result);
        navigate("/login");
      })
      .catch((error) => {
        logging.error(error);

        if (error.code.includes("auth/weak-password")) {
          setError("Пожалуйста, введите более надежный пароль.");
        } else if (error.code.includes("auth/email-already-in-user")) {
          setError("Этот электронный адрес уже занят.");
        } else {
          setError("Не удается войти,попробуйте в следующий раз(");
        }
        setRegistering(false);
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
          Зарегистрируйтесь и начните обучение
          <TextField
            margin="normal"
            size="small"
            type="text"
            label="Полное имя"
            variant="outlined"
            fullWidth
            sx={{ display: "block", marginBottom: 2 }}
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            required
          />
          <TextField
            margin="normal"
            size="small"
            type="email"
            id="email"
            label="Адрес электронной почты"
            variant="outlined"
            fullWidth
            sx={{ display: "block", marginBottom: 2 }}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <TextField
            margin="normal"
            size="small"
            type="password"
            id="confirm"
            label="Подтвердите пароль"
            variant="outlined"
            fullWidth
            sx={{ display: "block", marginBottom: 3 }}
            onChange={(e) => setConfirm(e.target.value)}
            value={confirm}
            required
          />
          <ButtonGroup size="large" color="secondary">
            <Button
              variant="contained"
              disabled={registering}
              type="submit"
              onClick={() => signUpWithEmailAndPassword()}
            >
              Регистрация
            </Button>
          </ButtonGroup>
          <small>
            <p className="m-1 text-center">
              Уже есть учетная запись? <Link to="/login">Войти</Link>{" "}
            </p>
          </small>
          <ErrorText error={error} />
        </Typography>
      </form>
    </Grid>
  );
};

export default Register;
