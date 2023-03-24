import { Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import IPageProps from "../interfaces/page";
import logging from "../config/logging";
import ErrorText from "../ErrorText";

export const ResetPasswordPage: React.FunctionComponent<IPageProps> = (
  props
) => {
  const [verifying, setVerifying] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean>(false);
  const [changing, setChanging] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [oobCode, setOobCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    logging.info("Extracting code");

    let searchParams = new URLSearchParams();

    if (searchParams) {
      let oobCode = searchParams.toString();

      if (oobCode) {
        logging.info("Code found");
        verifyPasswordResetLink(oobCode);
      } else {
        logging.error("Unable to find code");
        setVerified(false);
        setVerifying(false);
      }
    } else {
      logging.error("Unable to find code");
      setVerified(false);
      setVerifying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  const verifyPasswordResetLink = (_oobCode: string) => {
    auth
      .verifyPasswordResetCode(_oobCode)
      .then((result) => {
        logging.info(result);
        setOobCode(_oobCode);
        setVerified(true);
        setVerifying(false);
      })
      .catch((error) => {
        logging.error(error);
        setVerified(false);
        setVerifying(false);
      });
  };

  //

  const passwordResetRequest = () => {
    if (password !== confirm) {
      setError("Убедитесь, что ваши пароли совпадают");
      return;
    }
    if (error !== "") setError("");

    setChanging(true);

    auth
      .confirmPasswordReset(oobCode, password)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        logging.error(error);
        setError(error.message);
        setChanging(false);
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
          Сброс пароля
          {verifying ? (
            <CircularProgress color="secondary" />
          ) : (
            <>
              {verified ? (
                <>
                  <Typography>Пожалуйста,введите надежный пароль!</Typography>

                  <TextField
                    margin="normal"
                    size="small"
                    type="password"
                    id="password"
                    name="newPassword"
                    label="Пароль"
                    variant="outlined"
                    fullWidth
                    sx={{ display: "block", marginBottom: 3 }}
                    onChange={(event) => setPassword(event.target.value)}
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
                    onChange={(event) => setConfirm(event.target.value)}
                    value={confirm}
                    required
                  />
                  <ButtonGroup size="large" color="secondary">
                    <Button
                      disabled={changing}
                      type="submit"
                      onClick={() => passwordResetRequest()}
                    >
                      Подтвердить пароль
                    </Button>
                  </ButtonGroup>

                  <ErrorText error={error} />
                </>
              ) : (
                <Typography>Invalid link.</Typography>
              )}
            </>
          )}
        </Typography>
      </form>
    </Grid>
  );
};

export default ResetPasswordPage;
