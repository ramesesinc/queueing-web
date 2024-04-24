// pages/index.js

import Bpls from "../components/groups/Bpls";
import Rpt from "../components/groups/Rpt";
import Tc from "../components/groups/Tc";
import Button from "../components/ui/Button";
import Flex from "../components/ui/Flex";
import FontFamilyPicker from "../components/ui/FontFamilyPicker";
import UploadImage from "../components/ui/UploadImage";
import { useBplsData } from "../service/context/bplsdatas-context";

export default function Home() {
  const { bplsdata, updateLogoUrl, removeLogoUrl, handleSelect, handleSubmit } =
    useBplsData();
  return (
    <>
      <div className="flex w-full items-center justify-around">
        <Bpls title="BPLS" />
        <Rpt title="RPT" />
        <Tc title="TC" />
      </div>
      <form onSubmit={handleSubmit}>
        <Flex className="gap-10 justify-center items-center">
          <FontFamilyPicker
            value={bplsdata.bpls.fontFamily}
            onChange={handleSelect}
            name={"fontFamily"}
          />
          <UploadImage
            onLogoUploaded={updateLogoUrl}
            removeLogoImage={removeLogoUrl}
          />
          <Button
            caption="Update"
            type="submit"
            className="!p-0 !m-0 text-[10px] w-[20%] !rounded-md"
          />
        </Flex>
      </form>
    </>
  );
}
