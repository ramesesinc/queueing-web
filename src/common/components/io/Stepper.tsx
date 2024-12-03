"use client";

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import MuiStepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

type StepperStep = {
  step: number;
  name: string;
  caption: string;
};

type StepperProps = {
  steps: StepperStep[];
  className?: string;
  activeStep?: number;
  completedStep?: number;
  handleStep: (index: number) => void;
};

const Stepper: React.FC<StepperProps> = ({
  steps = [],
  className,
  activeStep = 0,
  completedStep = 0,
  handleStep,
}) => {
  const [actualStep, setActualStep] = useState(activeStep);
  const [currentStep, setCurrentStep] = useState(activeStep);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  useEffect(() => {
    const newCompleted = { ...completed };

    for (let i = completedStep - 1; i >= -1; i--) {
      newCompleted[i] = true;
    }

    setCompleted(newCompleted);
    setActualStep(activeStep > actualStep ? activeStep : actualStep);
    setCurrentStep(activeStep);
  }, [activeStep, completedStep]);

  return (
    <div className={`fixed w-fit ~left-2/12 ${className}`}>
      <MuiStepper nonLinear activeStep={actualStep} orientation="vertical">
        {steps.map((step, index) => {
          const isCompleted = !completed[index - 1];
          return (
            <Step key={step.name} completed={completed[index]}>
              {isCompleted ? (
                <StepLabel>
                  <Typography className="hidden lg:block">
                    {step.name}
                  </Typography>
                </StepLabel>
              ) : (
                <StepLabel
                  onClick={() => {
                    setCurrentStep(index);
                    handleStep(index);
                  }}
                  sx={{
                    ...(currentStep === index &&
                      completed[index] && {
                        "& .MuiStepIcon-root": {
                          color: "green",
                        },
                      }),
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Typography className="hidden lg:block">
                    {step.name}
                  </Typography>
                </StepLabel>
              )}
            </Step>
          );
        })}
      </MuiStepper>
    </div>
  );
};

export default Stepper;
