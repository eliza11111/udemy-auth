import { Alert } from "@mui/material";
import React from "react";

export interface IErrorTextProps {
  error: string;
}

const ErrorText: React.FunctionComponent<IErrorTextProps> = (props) => {
  const { error } = props;

  if (error === "") return null;

  return <Alert severity="error">{error}</Alert>;
};

export default ErrorText;
