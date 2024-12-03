"use client";

import { blue } from "@mui/material/colors";
import MuiInputLabel from "@mui/material/InputLabel";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";
import * as React from "react";
import { Field } from "react-final-form";

export type ToggleItemProps = {
  caption: string;
  value: string;
  selected?: boolean;
};

export const ToggleItem: React.FC<ToggleItemProps> = ({
  caption,
  value,
  selected = false,
}) => {
  return (
    <ToggleButton
      value={value}
      sx={{
        border: 2,
        borderColor: blue[600],
        "&.Mui-selected": {
          backgroundColor: blue[600],
          "&:hover": {
            backgroundColor: blue[600],
          },
        },
        padding: {
          xs: "8px 4px",
          sm: "8px 12px",
          md: "10px 14px",
        },
      }}
      fullWidth
      disableRipple
    >
      <MuiInputLabel
        sx={{
          fontSize: {
            xs: 8,
            sm: 12,
            md: 14,
          },
          fontWeight: 900,
          color: selected ? "white" : "black",
        }}
      >
        {caption}
      </MuiInputLabel>
    </ToggleButton>
  );
};

type ToggleProps = {
  name: string;
  caption?: string;
  defaultValue?: string | null;
  items?: ToggleItemProps[];
  onChange?: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => void;
} & MuiToggleButtonGroupProps;

export const Toggle: React.FC<ToggleProps> = ({
  name,
  caption,
  children,
  defaultValue,
  onChange,
  items = [],
  ...restProps
}) => {
  return (
    <Field name={name} defaultValue={defaultValue}>
      {(props) => {
        const [alignment, setAlignment] = React.useState<string | null>(
          defaultValue || ""
        );

        React.useEffect(() => {
          if (defaultValue !== undefined) {
            setAlignment(defaultValue);
          }
        }, [defaultValue]);

        const handleChange = (
          event: React.MouseEvent<HTMLElement>,
          newAlignment: string | null
        ) => {
          if (newAlignment !== null) {
            setAlignment(newAlignment);
            props.input.onChange(newAlignment);
            if (onChange) {
              onChange(event, newAlignment);
            }
          }
        };

        return (
          <div className="flex flex-col gap-y-2">
            {caption && (
              <MuiInputLabel sx={{ fontSize: 12 }}>{caption}</MuiInputLabel>
            )}
            <ToggleButtonGroup
              exclusive
              {...restProps}
              value={alignment}
              onChange={handleChange}
              defaultValue={defaultValue}
            >
              {items.length > 0
                ? items.map((item, index) => (
                    <ToggleItem
                      key={index}
                      value={item.value}
                      caption={item.caption}
                      selected={alignment === item.value}
                    />
                  ))
                : React.Children.map(children, (child) => {
                    if (React.isValidElement<ToggleItemProps>(child)) {
                      return React.cloneElement(child, {
                        selected: alignment === child.props.value,
                      });
                    }
                    return child;
                  })}
            </ToggleButtonGroup>
          </div>
        );
      }}
    </Field>
  );
};
