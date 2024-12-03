"use client";

import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";

type CardProps = {
  size?: number;
  children?: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ size = 700, children, className }) => {
  const theme = useTheme();

  return (
    <MuiCard
      sx={{
        width: {
          xs: "80%", // (mobile)
          sm: size * 0.8, // (tablets)
          md: size,
        },
        padding: {
          xs: 1,
          sm: 2,
          md: 3,
        },
        [theme.breakpoints.down("md")]: {
          margin: "0 auto",
        },
      }}
      className={`${className}`}
    >
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
};

export default Card;
