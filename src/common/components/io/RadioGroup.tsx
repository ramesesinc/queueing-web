"use client";

import { FormControlLabel, Radio, Typography } from "@mui/material";
import MuiRadioGroup, {
  RadioGroupProps as MuiRadioGroupProps,
} from "@mui/material/RadioGroup";
import { Field } from "react-final-form";

type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  name: string;
  options: RadioOption[];
  value?: string;
  label?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
} & MuiRadioGroupProps;

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  value,
  options,
  defaultValue,
  onChange,
  ...restProps
}) => {
  return (
    <Field name={name} type="radio" defaultValue={defaultValue}>
      {(props) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = event.target.value;
          props.input.onChange(event);
          if (onChange) {
            onChange(newValue);
          }
        };

        return (
          <MuiRadioGroup
            {...props.input}
            {...restProps}
            name={name}
            value={value ?? props.input.value}
            defaultValue={defaultValue}
            onChange={handleChange}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={
                  <Radio
                    sx={{
                      transform: {
                        xs: "scale(0.7)",
                        sm: "scale(0.8)",
                        md: "scale(0.9)",
                      },
                      margin: {
                        sx: -0.3,
                        sm: -0.2,
                        md: -0.1,
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.875rem",
                        md: "1rem",
                      },
                      marginLeft: -0.5,
                    }}
                  >
                    {option.label}
                  </Typography>
                }
              />
            ))}
          </MuiRadioGroup>
        );
      }}
    </Field>
  );
};

export default RadioGroup;
