"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as React from "react";
import { useEffect, useState } from "react";
import { Form as FinalForm } from "react-final-form";

import { isAsync, isFunction } from "../../helpers";
import Stepper from "./Stepper";

type PageFlowProps = {
  title: string;
  initialValues?: Record<string, any>;
  validate?: (
    values: Record<string, any>,
    page: PageFlowPage
  ) => Record<string, any>;
  pages: PageFlowPage[];
  initialStep?: number;
  activeStep?: number;
  completedStep?: number;
  handleStep?: (step: number) => void;
  showStepper?: boolean;
};

type PageFlowPage = {
  name: string;
  caption: string;
  Component: any;
  step?: number;
  onSubmit?: (values: Record<string, any>) => Record<string, any> | null;
  onCancel?: () => void;
  validate?: (values: Record<string, any>) => Record<string, any> | null;
};

export const PageFlow: React.FC<PageFlowProps> = ({
  title,
  pages = [],
  validate = (values: Record<string, any>) => ({}),
  initialValues = {},
  activeStep = 0,
  handleStep,
  completedStep = 0,
  showStepper = false,
}) => {
  const [currentStep, setCurrentStep] = useState(activeStep);
  const [currentPage, setCurrentPage] = useState(pages[activeStep]);
  const [completedSteps, setCompletedSteps] = useState<number>(completedStep);

  let Component = currentPage?.Component;

  useEffect(() => {
    if (typeof activeStep === "number" && handleStep) {
      setCurrentPage(() => pages[activeStep]);
    } else {
      setCurrentPage(() => pages[currentStep]);
    }
  }, [activeStep, currentStep, completedStep]);

  useEffect(() => {
    if (currentStep > completedStep) {
      setCompletedSteps(currentStep);
    }
  }, [currentStep]);

  const hasError = (errors: Record<string, any>) =>
    Object.keys(errors).length > 0;

  const validateHandler = (values: Record<string, any>) => {
    let errors = validate(values, currentPage!);
    if (hasError(errors)) return errors;
    if (currentPage && currentPage.validate) {
      return currentPage.validate(values);
    }
    return errors;
  };

  const executeStep = async (stepperFunc: any, values = {}) => {
    if (!stepperFunc) return -1;
    let retval = { nextStep: -1 };
    if (isAsync(stepperFunc)) {
      retval = (await stepperFunc(values)) ?? retval;
    } else if (isFunction(stepperFunc)) {
      retval = stepperFunc(values) ?? retval;
    }
    return retval.nextStep;
  };

  const moveNextStep = async (values: Record<string, any>) => {
    const nextStep = await executeStep(currentPage?.onSubmit, values);
    if (nextStep >= 0) {
      handleStep ? handleStep(nextStep) : setCurrentStep(nextStep);
      completedStep = completedStep + 1;
    } else {
      const nextSeqStep = Math.min(
        (handleStep ? activeStep : currentStep) + 1,
        pages.length - 1
      );
      handleStep ? handleStep(nextSeqStep) : setCurrentStep(nextSeqStep);
    }
  };

  const movePrevStep = async (values: Record<string, any>) => {
    const nextStep = await executeStep(currentPage?.onCancel, values);
    if (nextStep >= 0) {
      handleStep ? handleStep(nextStep) : setCurrentStep(nextStep);
    } else {
      const prevSeqStep = Math.max(
        (handleStep ? activeStep : currentStep) - 1,
        0
      );
      handleStep ? handleStep(prevSeqStep) : setCurrentStep(prevSeqStep);
    }
  };

  const formSubmitHandler = async (values: Record<string, any>) => {
    return await moveNextStep(values);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FinalForm initialValues={initialValues} onSubmit={formSubmitHandler}>
        {({
          handleSubmit,
          form,
          submitting,
          values,
          error,
          submitError,
          hasValidationErrors,
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              {showStepper && (
                <Stepper
                  steps={pages.map((page, index) => ({
                    step: index,
                    name: page.name,
                    caption: page.caption,
                  }))}
                  activeStep={handleStep ? activeStep : currentStep}
                  handleStep={(step) =>
                    handleStep ? handleStep(step) : setCurrentStep(step)
                  }
                  completedStep={completedSteps}
                />
              )}

              <Component
                title={title}
                form={form}
                formValues={values}
                error={error || submitError}
                submitting={submitting}
                onSubmit={() => moveNextStep(values)}
                onCancel={() => movePrevStep(values)}
                page={{
                  name: currentPage.name,
                  caption: currentPage.caption,
                  step: currentPage.step,
                }}
                hasValidationErrors={hasValidationErrors}
              />
            </div>
          </form>
        )}
      </FinalForm>
    </LocalizationProvider>
  );
};

export default PageFlow;
