"use client";

import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Field } from "react-final-form";

type DatePickerProps = {
  name: string;
  label: string;
  required?: boolean;
  variant?: "outlined" | "standard";
  size?: "small" | "medium";
  validate?: (value: any) => undefined | string;
  onDateChange?: (date: any) => void;
  readOnly?: boolean;
  disabled?: boolean;
  helperText?: string;
  fullWidth?: boolean;
};

const DatePicker: React.FC<DatePickerProps> = ({
  name,
  label,
  required,
  variant,
  size,
  validate,
  onDateChange,
  readOnly,
  disabled,
  helperText,
  fullWidth,
}) => {
  const [dateIssued, setDateIssued] = useState<string | null>(null);

  useEffect(() => {
    if (onDateChange) {
      onDateChange(dateIssued);
    }
  }, [dateIssued, onDateChange]);

  return (
    <Field name={name} validate={validate}>
      {(props) => (
        <MuiDatePicker
          label={label}
          value={props.input.value ? dayjs(props.input.value) : null}
          onChange={(date) => {
            const formattedDate = date
              ? dayjs(date).format("MM/DD/YYYY")
              : null;
            props.input.onChange(formattedDate);
            setDateIssued(formattedDate);
          }}
          readOnly={readOnly}
          slotProps={{
            textField: {
              size: size,
              variant: variant,
              required: required,
              fullWidth: fullWidth,
              error: props.meta.touched && Boolean(props.meta.error),
              helperText: helperText === undefined ? "MM/DD/YYYY" : helperText,
            },
          }}
          disabled={disabled}
          sx={style}
        />
      )}
    </Field>
  );
};

const style = {
  "& .MuiInputBase-root": {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
    },
  },
  "& .MuiFormHelperText-root": {
    fontSize: {
      xs: "0.5rem",
      sm: "0.563rem",
      md: "0.625rem",
    },
  },
};

export default DatePicker;
