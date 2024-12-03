import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import React from "react";

type IconButtonProps = {
  label: string;
  disabled?: boolean;
  icon: React.ReactNode;
} & MuiButtonProps;

const IconButton: React.FC<IconButtonProps> = ({
  label,
  disabled,
  variant = "contained",
  icon,
}) => {
  return (
    <MuiButton
      variant={variant}
      size="small"
      disabled={disabled}
      sx={{
        backgroundColor: "white",
        color: blue[700],
        borderStyle: "solid",
        borderWidth: 1,
        "&:hover": {
          backgroundColor: "white",
        },
      }}
    >
      <div className="flex items-center justify-center gap-x-1 text-center">
        <Typography
          variant="body1"
          sx={{ fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "16px" } }}
        >
          {label}
        </Typography>
        <div>{icon}</div>
      </div>
    </MuiButton>
  );
};

export default IconButton;
