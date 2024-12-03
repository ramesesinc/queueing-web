"use client";

import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import { Field } from "react-final-form";

type CheckboxProps = {
  name: string;
  label: string;
} & MuiCheckboxProps;

const Checkbox: React.FC<CheckboxProps> = ({ name, label, ...restProps }) => {
  return (
    <Field name={name} type="checkbox">
      {(props) => {
        return (
          <MuiFormControlLabel
            checked={!!props.input.value}
            label={label}
            control={
              <MuiCheckbox
                {...props.input}
                {...restProps}
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: {
                      xs: "0.875rem",
                      sm: "1rem",
                      md: "1.2rem",
                    },
                  },
                }}
              />
            }
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: {
                  xs: "0.75rem",
                  sm: "0.875rem",
                  md: "1rem",
                },
              },
            }}
          />
        );
      }}
    </Field>
  );
};

export default Checkbox;
