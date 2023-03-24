// import { Grid, TextField, Typography } from "@mui/material";
// import Button from "@mui/material/Button";
export {};
//!doesn't work
// import ButtonGroup from "@mui/material/ButtonGroup";
// import React, { useState } from "react";
// import { useNavigate, Navigate } from "react-router-dom";
// import { auth } from "../config/firebase";
// import IPageProps from "../interfaces/page";
// import logging from "../config/logging";
// import ErrorText from "../ErrorText";

// export const ChangePasswordPage: React.FunctionComponent<IPageProps> = (
//   props
// ) => {
//   const [changing, setChanging] = useState<boolean>(false);
//   const [password, setPassword] = useState<string>("");
//   const [old, setOld] = useState<string>("");
//   const [confirm, setConfirm] = useState<string>("");
//   const [error, setError] = useState<string>("");

//   const navigate = useNavigate();

//   const passwordChangeRequest = () => {
//     if (password !== confirm) {
//       setError("Убедитесь, что ваши пароли совпадают");
//       return;
//     }
//     if (error !== "") setError("");

//     setChanging(true);

//     auth.currentUser
//       ?.updatePassword(password)
//       .then(() => {
//         alert("Пароль успешно изменен!");
//         navigate("/");
//       })
//       .catch((error) => {
//         logging.error(error);
//         setChanging(false);
//         setError(error.message);
//       });
//   };

//   if (auth.currentUser?.providerData[0]?.providerId !== "password")
//     return <Navigate to="/" />;
//   return (
//     <Grid display="flex" justifyContent="center" alignItems="center">
//       <form>
//         <Typography
//           variant="subtitle2"
//           gutterBottom
//           sx={{ alignItems: "center", margin: 5 }}
//         >
//           Изменение пароля
//           <TextField
//             margin="normal"
//             size="small"
//             type="password"
//             id="password"
//             name="oldPassword"
//             label="Введите старый пароль"
//             variant="outlined"
//             fullWidth
//             sx={{ display: "block", marginBottom: 3 }}
//             onChange={(event) => setOld(event.target.value)}
//             value={old}
//             required
//           />
//           <TextField
//             margin="normal"
//             size="small"
//             type="password"
//             id="password"
//             label="Пароль"
//             variant="outlined"
//             fullWidth
//             sx={{ display: "block", marginBottom: 3 }}
//             onChange={(event) => setPassword(event.target.value)}
//             value={password}
//             required
//           />
//           <TextField
//             margin="normal"
//             size="small"
//             type="password"
//             id="confirm"
//             name="confirm"
//             label="Подтвердите пароль"
//             variant="outlined"
//             fullWidth
//             sx={{ display: "block", marginBottom: 3 }}
//             onChange={(event) => setConfirm(event.target.value)}
//             value={confirm}
//             required
//           />
//           <ButtonGroup size="large" color="secondary">
//             <Button
//               disabled={changing}
//               type="submit"
//               onClick={() => passwordChangeRequest()}
//             >
//               Изменить пароль
//             </Button>
//           </ButtonGroup>
//         </Typography>
//         <ErrorText error={error} />
//       </form>
//     </Grid>
//   );
// };

// export default ChangePasswordPage;
