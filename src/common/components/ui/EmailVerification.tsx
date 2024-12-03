import { phoneNumberFormatter } from "@/common/formatter";
import { lookupService } from "@/common/lib/client";
import { required, validateEmail } from "@/common/validators";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useFormState } from "react-final-form";
import ActionBar from "../io/ActionBar";
import Button from "../io/Button";
import Dialog from "../io/Dialog";
import Email from "../io/Email";
import Error from "../io/Error";
import Panel from "../io/Panel";
import Phone from "../io/Phone";
import Spacer from "../io/Spacer";
import Subtitle from "../io/Subtitle";
import Text from "../io/Text";
import TextField from "../io/TextField";
import { usePartnerContext } from "../model/PartnerModel";

type EmailVerificationProps = {
  requiredName?: boolean;
  requiredTitle?: boolean;
  onSuccess: () => void;
  onCancel: () => void;
};

const EmailVerification: React.FC<EmailVerificationProps> = ({
  requiredName = false,
  requiredTitle = false,
  onSuccess = () => null,
  onCancel = () => null,
}) => {
  const { partner } = usePartnerContext();
  const [mode, setMode] = useState("email");
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const { values, hasValidationErrors } = useFormState();
  const svc = lookupService("OTPService");

  let emailDesc =
    "A validation key will be sent to your email or mobile phone. Please make sure your email is valid and you have access to it.";
  let otpDesc =
    "Please check your email inbox or spam for the sent 6-digit validation key. If you have not received any email, please click resend code.";

  const handleEmailNext = async () => {
    setLoading(true);
    try {
      const otp = await svc?.invoke("generateOtp", {
        partnerid: partner?.channelid,
        contact: {
          email: values.email,
          phone: values.phone,
        },
      });
      if (!otp || otp.error) {
        setError(otp.error);
      } else {
        values.otp = otp;
        setMode("otp");
        setOpen(false);
        setError("");
      }
    } catch (error) {
      console.log("error => ", error);
    }
    setLoading(false);
  };

  const handleOtpNext = async () => {
    try {
      const otp = values.otp;
      const res = await svc?.invoke("verifyOtp", {
        key: otp.key,
        otp: values.enteredOtp,
      });
      if (res.status === "ERROR") {
        setError(res.error);
      } else {
        values.enteredOtp = "";
        onSuccess();
      }
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const handleDialog = () => {
    setOpen(!open);
  };

  const handleBack = () => {
    setMode("email");
    values.enteredOtp = "";
    setError("");
  };

  return (
    <>
      <Subtitle className="font-bold text-green-500">
        Email Verification
      </Subtitle>
      <Spacer />
      <Panel visibleWhen={mode === "email"}>
        <Error msg={error} />
        <Text>{emailDesc}</Text>
        <Spacer />

        <Panel className="flex flex-col gap-y-2">
          <Panel visibleWhen={requiredName} className="flex flex-col gap-y-2">
            <TextField name="name" label="Full Name" variant="standard" />
            <TextField name="address" label="Address" variant="standard" />
          </Panel>

          <Email
            name="email"
            label="Email Address"
            validate={validateEmail}
            variant="standard"
            fullWidth
          />
          <Phone
            name="phone"
            label="Phone Number"
            placeholder="(0000) 000-0000"
            variant="standard"
            onChange={(e) => setPhone(phoneNumberFormatter(e.target.value))}
            value={phone}
            fullWidth
          />
        </Panel>

        <ActionBar>
          <Button label="Cancel" variant="text" onClick={() => onCancel()} />
          <Button
            label="Next"
            variant="contained"
            onClick={handleEmailNext}
            disabled={hasValidationErrors || loading}
            endIcon={
              loading ? <CircularProgress thickness={5} size={24} /> : ""
            }
          />
        </ActionBar>
      </Panel>

      <Panel visibleWhen={mode === "otp"}>
        <Panel visibleWhen={requiredTitle}>
          <Error msg={error} />
          <Text>{otpDesc}</Text>
        </Panel>

        <TextField
          name="enteredOtp"
          label="OTP"
          validate={required}
          variant="standard"
          fullWidth
        />
        <div className="mt-5 flex justify-end">
          <Button onClick={handleDialog} variant="text" label={"Resend OTP"} />
        </div>
        <Dialog
          open={open}
          onClose={handleDialog}
          onConfirm={handleEmailNext}
          label={"Email Verification"}
        >
          Resend OTP
        </Dialog>
        <ActionBar>
          <Button label="Back" variant="text" onClick={handleBack} />
          <Button
            label="Next"
            variant="contained"
            onClick={handleOtpNext}
            disabled={hasValidationErrors}
          />
        </ActionBar>
      </Panel>
    </>
  );
};

export default EmailVerification;

{
}
