import { useState } from "react";
import { useBackgroundImageContext } from "../../service/context/bgimage-context";

const ImageUpload = ({
  onImageUploaded,
}: {
  onImageUploaded: (image: string) => void;
}) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = () => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        onImageUploaded(dataUrl); // Pass the image data URL to the parent component
      };
      reader.readAsDataURL(image);
    }
  };

  const { mainBackground, removeBackgroundImage } = useBackgroundImageContext();

  return (
    <div className="flex flex-col items-center text-[10px] p-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4 rounded w-[160px]"
      />
      <div className="flex gap-2">
        <button
          onClick={handleUpload}
          disabled={!image}
          className={`px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-400 transition duration-200 ${
            !image && "opacity-50 cursor-not-allowed"
          }`}
        >
          Upload
        </button>
        {mainBackground && (
          <button
            className={`px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-400 transition duration-200`}
            onClick={() => {
              removeBackgroundImage();
            }}
          >
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
