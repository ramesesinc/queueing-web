import { formatToPhpCurrency } from "@/common/formatter";
import { lookupService } from "@/common/lib/client";
import { required } from "@/common/validators";
import { ChangeEvent } from "react";
import ActionBar from "../io/ActionBar";
import Button from "../io/Button";
import Card from "../io/Card";
import Page from "../io/Page";
import Panel from "../io/Panel";
import Spacer from "../io/Spacer";
import Subtitle from "../io/Subtitle";
import Text from "../io/Text";
import TextField from "../io/TextField";
import Title from "../io/Title";
import { usePartnerContext } from "../model/PartnerModel";

const PayerInfo = (props: any) => {
  const bill = props.formValues.bill;
  const { partner, id } = usePartnerContext();
  const svc = lookupService("EPaymentService");
  let descriptionText =
    "Please confirm by filling in the name and address of the Payer for your electronic Official Receipt. Click Continue to proceed with payment.";

  const handleClickNext = async () => {
    const order = {
      origin: "filipizen",
      txntype: bill?.txntype,
      txntypename: bill?.txntypename,
      refno: bill?.bin,
      amount: bill?.amount,
      particulars: bill?.particulars,
      partner: {
        id: partner?.channelid,
        title: partner?.title,
        group: {
          objid: partner?.group.objid,
          name: partner?.group.name,
          title: partner?.group.title,
        },
      },
      payOption: { objid: "PAYMAYA" },
      paidby: props.formValues.payername,
      paidbyaddress: props.formValues.payeraddress,
      email: props.formValues.email,
      mobileno: props.formValues.phone,
      items: bill?.items,
      info: {
        data: bill,
      },
    };
    const res = await svc?.invoke("checkout", {
      order: order,
      partner: {
        id: partner?.channelid,
        name: partner?.name,
        title: partner?.title,
        group: {
          objid: partner?.group.objid,
          name: partner?.group.name,
          title: partner?.group.title,
        },
      },
      redirectUrl: {
        cancelUrl: props.page.options.cancelUrl,
        successUrl: props.page.options.successUrl,
      },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target;
    props.form.change(field, value.toUpperCase());
  };

  return (
    <Page>
      <Card>
        <Panel>
          <Title>{props.title}</Title>
          <Spacer />
          <Subtitle>{props.page.caption}</Subtitle>
          <Text>{descriptionText}</Text>
          <TextField
            name="payername"
            label="Payer Name"
            validate={required}
            variant="standard"
            fullWidth
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e, "payername")
            }
          />
          <TextField
            name="payeraddress"
            label="Payer Address"
            validate={required}
            variant="standard"
            fullWidth
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e, "payeraddress")
            }
          />
        </Panel>

        <Panel className="text-center">
          <Subtitle className="text-black">Payment Details</Subtitle>
          <Panel className="border-1 border border-black">
            <Title>{formatToPhpCurrency(bill.amount || 0, "PHP")}</Title>
          </Panel>
        </Panel>

        <ActionBar>
          <Button onClick={props.onCancel} variant="text" label="Back" />
          <Button
            type="submit"
            variant="contained"
            onClick={() => {}}
            disabled={props.hasValidationErrors}
            label="Continue"
          />
        </ActionBar>
      </Card>
    </Page>
  );
};

export default PayerInfo;
