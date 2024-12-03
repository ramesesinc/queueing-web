"use client";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "./Button";

interface AlertProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  label: string;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  open,
  onClose,
  onConfirm,
  label,
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{label}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button label="Cancel" variant="text" onClick={onClose} />
        <Button label="OK" variant="contained" onClick={onConfirm} />
      </DialogActions>
    </Dialog>
  );
};

export default Alert;
