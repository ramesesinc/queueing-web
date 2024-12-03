"use client";

import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type ButtonProps = {
  label: string;
  variant?: "text" | "outlined" | "contained";
} & MuiButtonProps;

const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  ...restProps
}) => {
  return (
    <MuiButton {...restProps} variant={variant}>
      <Typography
        variant="body1"
        sx={{
          fontSize: {
            xs: "0.625rem",
            sm: "0.75rem",
            md: "0.875rem",
          },
        }}
      >
        {restProps.label}
      </Typography>
    </MuiButton>
  );
};

export default Button;
