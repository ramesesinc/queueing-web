"use client";

import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import React from "react";

interface ModalsProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showClose?: boolean;
}

const Modals: React.FC<ModalsProps> = ({
  open,
  onClose,
  children,
  showClose = false,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          borderRadius: 2,
          padding: 2,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: {
            xs: "90%",
            sm: "80%",
            md: "60%",
          },
        }}
      >
        {showClose && (
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
              cursor: "pointer",
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        {children}
      </Box>
    </Modal>
  );
};

export default Modals;
