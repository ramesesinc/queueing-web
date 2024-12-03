import ProfessionalLookup from "@/bldgpermit/components/ProfessionalLookup";
import { formatDate } from "@/common/formatter";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useState } from "react";
import Modal from "../io/Modal";
import Spacer from "../io/Spacer";

interface ProfessionalCardProps {
  caption: string;
  professional?: any;
  onSelectProfessional?: any;
  roles?: string;
  showSearch?: boolean;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  caption,
  professional,
  onSelectProfessional,
  roles,
  showSearch,
}) => {
  const [professionalLookup, setProfessionalLookup] = useState<boolean>(false);
  const cardClass = professional
    ? "rounded-lg border bg-[url('/bg-id.png')] bg-cover p-2 shadow-lg"
    : "rounded-lg border bg-gray-300 p-2 shadow-lg";

  return (
    <div className={cardClass}>
      <div className="flex items-center justify-between p-2">
        <div className="text-[0.625rem] font-bold uppercase lg:text-[0.75rem]">
          {caption}
        </div>
        {showSearch && (
          <IconButton
            onClick={() => setProfessionalLookup(true)}
            size="small"
            disableRipple
          >
            <SearchIcon fontSize="small" />
          </IconButton>
        )}
      </div>
      <div className="border-1 border border-black" />
      <div className="p-2 text-[0.5rem] lg:text-[0.625rem]">
        <div className="text-[0.625rem] font-bold uppercase lg:text-[0.75rem]">
          {professional?.name || "professional name"}
        </div>
        <div className="uppercase">
          {professional?.profession || "professional profession"}
        </div>
        <Spacer />
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-2">
            <div className="font-bold">
              <p>PRC No.</p>
              <p>Valid Until</p>
              <p>Date Issued</p>
              <p>Place Issued</p>
            </div>
            <div>
              <div>{professional?.prcno}</div>
              <div>{formatDate(professional?.prc?.dtvalid)}</div>
              <div>{formatDate(professional?.ptr?.dtissued)}</div>
              <div>{professional?.prc?.placeissued}</div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="font-bold">
              <p>PTR No</p>
              <p>Valid Until</p>
              <p>Date Issued</p>
              <p>Place Issued</p>
            </div>
            <div>
              <div>{professional?.ptr?.refno}</div>
              <div>{formatDate(professional?.prc?.dtvalid)}</div>
              <div>{formatDate(professional?.ptr?.dtissued)}</div>
              <div>{professional?.ptr?.placeissued}</div>
            </div>
          </div>
        </div>
        <div className="flex">
          <p className="mr-2 font-bold">Address</p>
          <p>{professional?.address?.text}</p>
        </div>
      </div>

      <Modal
        open={professionalLookup}
        onClose={() => setProfessionalLookup(false)}
      >
        <ProfessionalLookup
          onSelect={onSelectProfessional}
          role={roles}
          onClose={() => setProfessionalLookup(false)}
        />
      </Modal>
    </div>
  );
};

export default ProfessionalCard;
