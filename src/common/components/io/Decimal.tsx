"use client";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import { Field } from "react-final-form";

type DecimalFieldProps = {
  name: string;
  validate?: (value: any) => undefined | string;
  defaultValue?: string;
  textAlign?: "right" | "left";
  readOnly?: boolean;
  adornment?: {
    showAdornment: boolean;
    adornmentPosition: "start" | "end";
    adornmentContent: React.ReactNode;
    adornmentOnClick?: () => void;
  };
} & MuiTextFieldProps;

const DecimalField: React.FC<DecimalFieldProps> = ({
  name,
  validate,
  defaultValue,
  textAlign,
  readOnly,
  adornment,
  ...restProps
}) => {
  const formatValue = (value: any) => {
    if (value === null || value === undefined) return undefined;

    value = String(value);
    value = value.replace(/[^0-9.]/g, "");

    const parts = value.split(".");
    let formattedValue = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (parts.length > 1) {
      formattedValue += "." + parts[1];
    }

    if (!value.includes(".")) {
      formattedValue += ".00";
    }

    if (parts[0] === "" || parts[0] === null || parts[0] === undefined) {
      formattedValue = "";
    }

    return formattedValue;
  };

  return (
    <Field
      name={name}
      validate={validate}
      defaultValue={defaultValue ? formatValue(defaultValue) : ""}
    >
      {(props) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          let newValue = event.target.value;
          const cursorPosition = event.target.selectionStart || 0;

          newValue = newValue.replace(/[^0-9.]/g, "");

          const parts = newValue.split(".");
          let formattedValue = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          if (parts.length > 1) {
            formattedValue += "." + parts[1];
          }

          if (!newValue.includes(".")) {
            formattedValue += ".00";
          }

          if (parts[0] === "" || parts[0] === null || parts[0] === undefined) {
            formattedValue = "";
          }

          const commaCountBefore = (
            event.target.value.slice(0, cursorPosition).match(/,/g) || []
          ).length;
          const commaCountAfter = (
            formattedValue.slice(0, cursorPosition).match(/,/g) || []
          ).length;
          const adjustedCursorPosition =
            cursorPosition + (commaCountAfter - commaCountBefore);

          props.input.onChange({ target: { value: formattedValue } });

          setTimeout(() => {
            if (newValue.includes(".")) {
              const dotIndex = formattedValue.indexOf(".");
              if (cursorPosition === dotIndex + 1) {
                event.target.setSelectionRange(dotIndex + 1, dotIndex + 1);
              } else if (adjustedCursorPosition > dotIndex) {
                event.target.setSelectionRange(
                  adjustedCursorPosition,
                  adjustedCursorPosition,
                );
              } else {
                event.target.setSelectionRange(
                  adjustedCursorPosition,
                  adjustedCursorPosition,
                );
              }
            } else {
              event.target.setSelectionRange(
                adjustedCursorPosition,
                adjustedCursorPosition,
              );
            }
          }, 0);
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
            {...restProps}
            {...props.input}
            value={formatValue(props.input.value)}
            onChange={handleChange}
            sx={style}
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

export default DecimalField;
