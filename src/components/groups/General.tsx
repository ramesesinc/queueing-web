import React from "react";
import FontFamilyPicker from "../ui/FontFamilyPicker";
import ImageUpload from "../ui/UploadImage";
import InputBox from "../ui/InputBox";
import { useData } from "@/context/DataContext";

const General = () => {
  const {
    general,
    handleChange,
    handleSelect,
    handleSubmit,
    removeLogoUrl,
    updateLogoUrl,
  } = useData();
  return (
    <form onSubmit={handleSubmit}>
      <FontFamilyPicker
        value={general.fontFamily || "Arial"}
        onChange={handleSelect}
        name={"fontFamily"}
        title="Font Style"
      />
      <ImageUpload
        onLogoUploaded={updateLogoUrl}
        removeLogoImage={removeLogoUrl}
        title="Upload Logo"
        imgUrl={general.logoUrl}
      />
      <InputBox
        label="LGU Name"
        name="lguname"
        value={general.lguname}
        onChange={handleChange}
      />
      <InputBox
        label="Slide Message"
        name="slidemessage"
        value={general.slidemessage}
        onChange={handleChange}
      />
    </form>
  );
};

export default General;
