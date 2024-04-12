import { useState } from "react";

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

  return (
    <div className="flex flex-col items-center text-[12px] p-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4 rounded"
      />
      <button
        onClick={handleUpload}
        disabled={!image}
        className={`px-4 py-2 bg-blue-500 text-white rounded ${
          !image && "opacity-50 cursor-not-allowed"
        }`}
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUpload;
