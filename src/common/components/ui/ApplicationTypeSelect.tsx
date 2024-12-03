"use client";

import ActionBar from "@/common/components/io/ActionBar";
import Button from "@/common/components/io/Button";
import Error from "@/common/components/io/Error";
import Panel from "@/common/components/io/Panel";
import RadioGroup from "@/common/components/io/RadioGroup";
import Subtitle from "@/common/components/io/Subtitle";
import TextField from "@/common/components/io/TextField";
import Title from "@/common/components/io/Title";
import { usePartnerContext } from "@/common/components/model/PartnerModel";
import { lookupService } from "@/common/lib/client";
import { useEffect, useState } from "react";
import Form from "../io/Form";

interface ApplicationTypeSelectProps {
  title: string;
  method: string;
  onSubmit: (params: any) => void;
  onCancel: () => void;
}

const ApplicationTypeSelect: React.FC<ApplicationTypeSelectProps> = ({
  title,
  method,
  onSubmit,
  onCancel,
}) => {
  const { partner } = usePartnerContext();
  const [apptype, setAppType] = useState<"new" | "resume">("new");
  const [appno, setAppno] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const svc = lookupService("ApplicationService");

  useEffect(() => {
    if (appno !== "resume") return removeErrors();
  }, [apptype]);

  const removeErrors = () => {
    setError(false);
    setErrorMsg("");
  };

  const fetchApplication = async (appno: string) => {
    const app = await svc?.invoke(method, { objid: appno });
    if (app.code !== "error") {
      onSubmit(app);
    } else {
      setErrorMsg(app.error);
    }
  };

  const handleSubmit = (values: any) => {
    if (values.apptype !== "resume") return onSubmit(apptype);

    if (!values.appno) {
      setError(true);
    } else {
      removeErrors();
      const orgcode = values.appno.includes("-")
        ? values.appno.split("-")[0]
        : values.appno;
      if (orgcode.includes(partner?.id)) {
        removeErrors();
        fetchApplication(values.appno);
      } else {
        setErrorMsg(
          "The application number provided is not for this local government",
        );
      }
    }
  };

  return (
    <>
      <Title>{title}</Title>
      <Subtitle className="font-bold text-green-500">Select Action</Subtitle>
      <Error msg={errorMsg} />
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit, values }) => (
          <Panel className="grid">
            <RadioGroup
              name={"apptype"}
              value={apptype}
              defaultValue={apptype}
              options={[
                { label: "Create New Application", value: "new" },
                { label: "Resume Pending Application", value: "resume" },
              ]}
              onChange={(value) => setAppType((value as "new") || "resume")}
            />

            <Panel visibleWhen={apptype === "resume"} className="ml-8">
              <TextField
                name="appno"
                label="Application Tracking No."
                size="small"
                variant="outlined"
                error={error}
                helperText={error ? "Tracking No. is required." : ""}
                onChange={(e) => setAppno(e.target.value)}
              />
            </Panel>

            <ActionBar>
              <Button label="Cancel" variant="text" onClick={onCancel} />
              <Button label="Next" variant="contained" onClick={handleSubmit} />
            </ActionBar>
          </Panel>
        )}
      />
    </>
  );
};

export default ApplicationTypeSelect;
