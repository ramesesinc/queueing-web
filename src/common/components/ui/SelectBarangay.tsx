import { SelectItem } from "@/common/components/io/Select";
import TextField from "@/common/components/io/TextField";

type SelectBarangayProps = {
  entity: string;
  list?: string[];
};

const SelectBarangay: React.FC<SelectBarangayProps> = ({
  entity,
  list = [],
}) => {
  let barangays = [
    "POBLACION 09",
    "POBLACION I",
    "POBLACION II",
    "BOOL",
    "BOOY",
    "CABAWAN",
    "COGON",
  ];
  const barangaylist = list && list.length > 0 ? list : barangays;

  return (
    <>
      <TextField
        name={`${entity}.address.local.barangay`}
        label="Barangay"
        variant="standard"
        select
        fullWidth
      >
        {barangaylist.map((barangay, index) => (
          <SelectItem key={index} value={barangay.toUpperCase()}>
            {barangay.toUpperCase()}
          </SelectItem>
        ))}
      </TextField>
    </>
  );
};

export default SelectBarangay;
