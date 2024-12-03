"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import {
  Form as ReactFinalForm,
  FormProps as ReactFinalFormProps,
} from "react-final-form";

type FormProps = {
  onSubmit: (values: any) => void;
  render: (formProps: {
    handleSubmit: () => void;
    hasValidationErrors: boolean;
    values: any;
  }) => React.ReactNode;
} & Omit<ReactFinalFormProps<any>, "onSubmit" | "render">;

const Form: React.FC<FormProps> = ({ onSubmit, render, ...restProps }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReactFinalForm
        {...restProps}
        onSubmit={onSubmit}
        render={({ handleSubmit, hasValidationErrors, values }) => (
          <form onSubmit={handleSubmit}>
            {render({ handleSubmit, hasValidationErrors, values })}
          </form>
        )}
      />
    </LocalizationProvider>
  );
};

export default Form;
