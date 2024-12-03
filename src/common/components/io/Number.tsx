"use client";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import { Field } from "react-final-form";
import { formatNumber } from "../../formatter";

type NumberFieldProps = {
  name: string;
  validators?: [];
  validate?: (value: any) => undefined | string;
  defaultValue?: string;
  textAlign?: "right" | "left";
  adornment?: {
    showAdornment: boolean;
    adornmentPosition: "start" | "end";
    adornmentContent: React.ReactNode;
    adornmentOnClick?: () => void;
  };
} & MuiTextFieldProps;

const NumberField: React.FC<NumberFieldProps> = ({
  name,
  validate,
  defaultValue,
  textAlign,
  adornment,
  ...restProps
}) => {
  return (
    <Field name={name} validate={validate} defaultValue={defaultValue}>
      {(props) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          let newValue = event.target.value;

          if (newValue === "") {
            props.input.onChange(event);
            return;
          }

          const formattedValue = formatNumber(newValue);
          props.input.onChange({ target: { value: formattedValue } });
        };

        const renderAdornmentContent = (adornmentContent: React.ReactNode) => {
          if (typeof adornmentContent === "string") {
            return <span>{adornmentContent}</span>;
          }

          return (
            <IconButton onClick={adornment?.adornmentOnClick}>
              {adornmentContent}
            </IconButton>
          );
        };

        return (
          <MuiTextField
            error={
              (props.meta.touched && !!props.meta.error) ||
              !!props.meta.submitError
            }
            helperText={
              props.meta.touched && (props.meta.error || props.meta.submitError)
            }
            {...props.input}
            {...restProps}
            value={props.input.value}
            onChange={handleChange}
            inputProps={{ style: { textAlign: textAlign } }}
            slotProps={{
              input: {
                startAdornment:
                  adornment?.showAdornment &&
                  adornment?.adornmentPosition === "start" ? (
                    <InputAdornment position="start">
                      {renderAdornmentContent(adornment.adornmentContent)}
                    </InputAdornment>
                  ) : null,

                endAdornment:
                  adornment?.showAdornment &&
                  adornment?.adornmentPosition === "end" ? (
                    <InputAdornment position="end">
                      {renderAdornmentContent(adornment.adornmentContent)}
                    </InputAdornment>
                  ) : null,
              },
              inputLabel: {
                shrink:
                  defaultValue !== undefined ||
                  props.input.value ||
                  adornment?.adornmentPosition === "start"
                    ? true
                    : false,
              },
            }}
            sx={style}
          />
        );
      }}
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
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
    },
  },
};

export default NumberField;
