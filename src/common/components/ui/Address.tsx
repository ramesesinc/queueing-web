"use client";

import Checkbox from "@/common/components/io/Checkbox";
import Panel from "@/common/components/io/Panel";
import TextField from "@/common/components/io/TextField";
import { useEffect } from "react";
import { useForm, useFormState } from "react-final-form";
import SelectBarangay from "./SelectBarangay";

const addressType = [
  [
    { name: "unitno", label: "Unit No" },
    { name: "bldgno", label: "Building No" },
    { name: "bldgname", label: "Building Name" },
  ],
  [
    { name: "street", label: "Street" },
    { name: "subdivision", label: "Subdivision" },
  ],
];

const addressType3 = [
  { name: "barangay", label: "Barangay" },
  { name: "citymunicipality", label: "City/Municipality" },
  { name: "province", label: "Province" },
];

type AddressProps = {
  entity: string;
  data?: any;
};

const Address: React.FC<AddressProps> = ({ entity, data }) => {
  const { values } = useFormState();
  const form = useForm();

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        form.change(`${entity}.address.unitno`, data.address.unitno || "");
        form.change(`${entity}.address.bldgno`, data.address.bldgno || "");
        form.change(`${entity}.address.bldgname`, data.address.bldgname || "");
        form.change(`${entity}.address.street`, data.address.street || "");
        form.change(
          `${entity}.address.subdivision`,
          data.address.subdivision || "",
        );

        form.change(
          `${entity}.address.resident`,
          data.resident === true ? true : false,
        );

        if (data.resident === true) {
          form.change(
            `${entity}.address.local.barangay`,
            data.address.barangay.name || "",
          );
        }

        form.change(
          `${entity}.address.barangay`,
          data.address.barangay.name || "",
        );
        form.change(
          `${entity}.address.citymunicipality`,
          data.address.citymunicipality,
        );
        form.change(`${entity}.address.province`, data.address.province || "");
      }
    };
    fetchData();
  }, [data]);

  return (
    <>
      <div className="w-fit">
        <Checkbox name={`${entity}.address.resident`} label="Resident" />
      </div>
      <Panel className="flex flex-col gap-y-2">
        {addressType.map((fields, index) => (
          <div key={index} className="flex gap-x-2">
            {fields.map((field) => (
              <TextField
                key={field.name}
                name={`${entity}.address.${field.name}`}
                label={field.label}
                variant="standard"
                fullWidth
              />
            ))}
          </div>
        ))}
        <Panel visibleWhen={values?.[`${entity}`]?.address?.resident === true}>
          <SelectBarangay entity={entity} />
        </Panel>
      </Panel>

      <Panel
        visibleWhen={
          values?.[`${entity}`]?.address?.resident === false ||
          values?.[`${entity}`]?.address?.resident === undefined
        }
        className="flex gap-x-2"
      >
        {addressType3.map((field) => (
          <TextField
            key={field.name}
            name={`${entity}.address.${field.name}`}
            label={field.label}
            variant="standard"
            fullWidth
          />
        ))}
      </Panel>
    </>
  );
};

export default Address;
