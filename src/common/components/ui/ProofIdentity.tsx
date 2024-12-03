"use client";

import DatePicker from "@/common/components/io/DatePicker";
import Panel from "@/common/components/io/Panel";
import { SelectItem } from "@/common/components/io/Select";
import TextField from "@/common/components/io/TextField";
import { driverFormatter, umidFormatter } from "@/common/formatter";
import { lookupService } from "@/common/lib/client";
import { required } from "@/common/validators";
import { IdType } from "@/types/IdType";
import { useEffect, useState } from "react";
import { useForm, useFormState } from "react-final-form";

type ProofIdentityProps = {
  entity: string;
  data?: any;
};

const formatterMap: Record<string, (value: string) => string> = {
  driverFormatter,
  umidFormatter,
};

const ProofIdentity: React.FC<ProofIdentityProps> = ({ entity, data }) => {
  const [idTypes, setIdTypes] = useState<IdType[]>([]);
  const [selectedId, setSelectedId] = useState<IdType>();
  const { values } = useFormState();
  const form = useForm();
  const svc = lookupService("IdTypeService");

  useEffect(() => {
    if (data) fetchProofIdentity();
    fetchIdTypes();
  }, [data]);

  const fetchIdTypes = async () => {
    const ids: IdType[] = await svc?.invoke("getIdType");
    setIdTypes(ids);
  };

  const fetchProofIdentity = async () => {
    form.change(`${entity}.id.type.title`, data.id.type.title || "");
    form.change(`${entity}.id.type.name`, data.id.type.name || "");
    form.change(`${entity}.id.type.caption`, data.id.type.caption || "");
    form.change(`${entity}.id.idno`, data.id.idno || "");
    form.change(`${entity}.id.placeissued`, data.id.placeissued || "");
    form.change(`${entity}.id.dtissued`, data.id.dtissued || "");
    form.change(`${entity}.id.dtvalid`, data.id.dtvalid || "");
  };

  useEffect(() => {
    const idType = idTypes.find(
      (type) =>
        type.name.toUpperCase() ===
        values?.[`${entity}`]?.id?.type?.title.toUpperCase(),
    );
    setSelectedId(idType);
    form.change(`${entity}.id.type.name`, idType?.name);
    form.change(`${entity}.id.type.caption`, idType?.caption);
  }, [values?.[`${entity}`]?.id?.type?.title]);

  useEffect(() => {
    const formatterName = selectedId?.formatter;
    const formatterFunction = formatterName
      ? formatterMap[formatterName]
      : undefined;

    if (formatterFunction && values?.[`${entity}`]?.id?.idno) {
      const formattedValue = formatterFunction(values[`${entity}`].id.idno);
      form.change(`${entity}.id.idno`, formattedValue);
    }
  }, [values?.[`${entity}`]?.id?.idno, selectedId]);

  return (
    <>
      <div className="grid grid-cols-3 gap-x-2">
        <TextField
          name={`${entity}.id.type.title`}
          label="ID Type"
          validate={required}
          variant="standard"
          select
          fullWidth
          required
        >
          {idTypes.map((idtype, index) => (
            <SelectItem key={index} value={idtype.name.toUpperCase()}>
              {idtype.name.toUpperCase()}
            </SelectItem>
          ))}
        </TextField>

        <TextField
          name={`${entity}.id.idno`}
          label="ID No."
          validate={required}
          variant="standard"
          required
        />
        <TextField
          name={`${entity}.id.placeissued`}
          label="Place Issued"
          validate={required}
          variant="standard"
          required
        />
      </div>

      <Panel className="mt-2 flex gap-x-2">
        <DatePicker
          name={`${entity}.id.dtissued`}
          label="Date Issued"
          validate={required}
          variant="standard"
          fullWidth
          required
        />
        <Panel
          visibleWhen={selectedId?.validity === true}
          className={selectedId?.validity ? "w-full" : ""}
        >
          <DatePicker
            name={`${entity}.id.dtvalid`}
            label="Validity Date"
            validate={required}
            readOnly={`${entity}.id.dtissued` === null}
            disabled={`${entity}.id.dtissued` === null}
            variant="standard"
            fullWidth
            required
          />
        </Panel>
      </Panel>
    </>
  );
};

export default ProofIdentity;
