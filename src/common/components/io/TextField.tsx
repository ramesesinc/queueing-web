"use client";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import { Field } from "react-final-form";

type TextFieldProps = {
  name: string;
  validate?: (value: any) => undefined | string;
  defaultValue?: string | number | Date | undefined | null;
  textAlign?: "right" | "left";
  readOnly?: boolean;
  adornment?: {
    showAdornment: boolean;
    adornmentPosition: "start" | "end";
    adornmentContent: React.ReactNode;
    adornmentOnClick?: () => void;
  };
} & MuiTextFieldProps;

const TextField: React.FC<TextFieldProps> = ({
  name,
  validate,
  defaultValue,
  textAlign,
  readOnly = false,
  adornment,
  ...restProps
}) => {
  return (
    <Field name={name} validate={validate} defaultValue={defaultValue}>
      {(props) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          props.input.onChange(e.target.value.toUpperCase());
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
            {...restProps}
            {...props.input}
            error={
              (props.meta.touched && !!props.meta.error) ||
              !!props.meta.submitError
            }
            helperText={
              props.meta.touched && (props.meta.error || props.meta.submitError)
            }
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

                onChange: handleChange,
                readOnly: readOnly,
              },
              // inputLabel: {
              //   shrink:
              //     defaultValue !== undefined ||
              //     props.input.value ||
              //     adornment?.adornmentPosition === "start"
              //       ? true
              //       : false,
              // },
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
      xs: "0.625rem",
      sm: "0.75rem",
      md: "0.875rem",
    },
  },
};

export default TextField;
