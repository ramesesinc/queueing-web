"use client";

import MuiFormControl from "@mui/material/FormControl";
import MuiInputLabel from "@mui/material/InputLabel";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiSelect, { SelectProps as MuiSelectProps } from "@mui/material/Select";
import { Field } from "react-final-form";

export type SelectItemType = {
  objid?: string;
  label: string;
  value: string | number | undefined;
};

type SelectProps = {
  name: string;
  label?: string;
  validators?: [];
  validate?: (value: any) => undefined | string;
  items?: SelectItemType[];
  itemKey?: string;
  minWidth?: number;
  variant?: "standard" | "outlined" | "filled";
  fullWidth?: boolean;
  required?: boolean;
  defaultValue?: string;
} & MuiSelectProps;

export const SelectItem = MuiMenuItem;

export const Select: React.FC<SelectProps> = ({
  name,
  title,
  label,
  validate,
  children,
  minWidth = 120,
  variant = "standard",
  defaultValue,
  fullWidth,
  required,
  items = [],
  itemKey = "objid",
  ...restProps
}) => {
  let selectItems: React.ReactNode = null;
  if (items.length > 0) {
    selectItems = items?.map((item, index) => (
      <MuiMenuItem key={index} value={item.value}>
        <MuiInputLabel
          sx={{
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
              md: "1rem",
            },
          }}
        >
          {item.label}
        </MuiInputLabel>
      </MuiMenuItem>
    ));
  } else {
    selectItems = children;
  }
  return (
    <MuiFormControl variant={variant} fullWidth={fullWidth} required={required}>
      <MuiInputLabel
        sx={{
          fontSize: {
            xs: "0.75rem",
            sm: "0.875rem",
            md: "1rem",
          },
        }}
      >
        {label}
      </MuiInputLabel>
      <Field name={name} validate={validate} defaultValue={defaultValue}>
        {(props) => {
          return (
            <MuiSelect
              {...props.input}
              {...restProps}
              sx={{
                fontSize: {
                  xs: "0.75rem",
                  sm: "0.875rem",
                  md: "1rem",
                },
              }}
            >
              {selectItems}
            </MuiSelect>
          );
        }}
      </Field>
    </MuiFormControl>
  );
};
