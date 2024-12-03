import ActionBar from "@/common/components/io/ActionBar";
import Button from "@/common/components/io/Button";
import Spacer from "@/common/components/io/Spacer";

import Checkbox from "@/common/components/io/Checkbox";
import Text from "@/common/components/io/Text";
import { useState } from "react";

type ConfirmationProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

const Confirmation: React.FC<ConfirmationProps> = ({ onSuccess, onCancel }) => {
  const [confirmation, setConfirmation] = useState<boolean>(false);

  return (
    <>
      <Spacer />
      <Text className="font-bold">
        Please read thoroughly before proceeding
      </Text>
      <Spacer />
      <Text className="text-justify indent-8">
        This online service will require personal information from the
        applicant, lot owner(s) and professionals involved in this transaction.
        In compliance with the Data Privacy Act, we are securing your consent
        that you have been authorized by the aforementioned parties to act on
        their behalf. The data collected will be stored, processed and used for
        effectively carrying out legitimate transactions with the local
        government of Tagbilaran City. If you do not agree to these terms, you
        can cancel out by click on the Cancel button. If you agree to these
        terms, tick on the checkbox and click Continue.
      </Text>
      <Spacer />
      <div className="flex items-center">
        <Checkbox
          checked={confirmation}
          onChange={(e) => setConfirmation(e.target.checked)}
          name={"confirmation"}
          label="Yes, I have read and agree to the terms and conditions."
        />
      </div>
      <ActionBar>
        <Button label="Cancel" variant="text" onClick={onCancel} />
        <Button
          type="submit"
          label="Continue"
          onClick={onSuccess}
          disabled={!confirmation}
        />
      </ActionBar>
    </>
  );
};

export default Confirmation;
