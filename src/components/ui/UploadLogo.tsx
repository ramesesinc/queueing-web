import { useState } from "react";

import { useLogoImageContext } from "../../service/context/logo-context";

const LguLogoUpload = ({
  onLogoUploaded,
}: {
  onLogoUploaded: (lguLogo: string) => void;
}) => {
  const [lguLogo, setLguLogo] = useState<File | null>(null);
  const { logo, removeLogoImage } = useLogoImageContext();
  const handleLguLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setLguLogo(file);
    }
  };

  const handleUpload = () => {
    if (lguLogo) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        onLogoUploaded(dataUrl); // Pass the image data URL to the parent component
      };
      reader.readAsDataURL(lguLogo);
    }
  };

  return (
    <div className="flex flex-col items-center text-[10px] p-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleLguLogoChange}
        className="mb-4 rounded w-[160px]"
      />
      <div className="flex gap-2">
        <button
          onClick={handleUpload}
          disabled={!lguLogo}
          className={`px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-400 transition duration-200 ${
            !lguLogo && "opacity-50 cursor-not-allowed"
          }`}
        >
          Upload
        </button>
        {logo && (
          <button
            className={`px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-400 transition duration-200`}
            onClick={() => {
              removeLogoImage();
            }}
          >
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default LguLogoUpload;
