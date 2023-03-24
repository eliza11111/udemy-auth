import { Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { auth } from "../config/firebase";
import { Alert } from "@mui/material";
import IPageProps from "../interfaces/page";
import logging from "../config/logging";
import ErrorText from "../ErrorText";

export const ForgotPasswordPage: React.FunctionComponent<IPageProps> = () => {
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetPasswordRequest = () => {
    if (error !== "") setError("");

    setSending(true);

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        logging.info("Email sent");
        setSent(true);
        setSending(false);
      })
      .catch((error) => {
        logging.error(error);
        setError(error.message);
        setSending(false);
      });
  };

  return (
    <Grid
      sx={{ marginTop: 10 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <form>
        <Typography
          sx={{
            marginBottom: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Забыли пароль?
        </Typography>
        {sent ? (
          <Alert>
            <Typography>На почту отправлена ссылка с инструкцией!</Typography>
          </Alert>
        ) : (
          <>
            <TextField
              margin="normal"
              size="small"
              type="email"
              id="email"
              name="email"
              label="Адрес электронной почты"
              variant="outlined"
              fullWidth
              sx={{ display: "block", marginBottom: 3 }}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              required
            />
            <Button
              sx={{ marginBottom: 3 }}
              variant="contained"
              disabled={sending}
              color="secondary"
              onClick={() => resetPasswordRequest()}
            >
              Отправить ссылку сброса
            </Button>
            <ErrorText error={error} />
          </>
        )}
      </form>
    </Grid>
  );
};

//

export default ForgotPasswordPage;
