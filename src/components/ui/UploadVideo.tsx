import { useState } from "react";

const VideoUpload = ({
  onVideoUploaded,
}: {
  onVideoUploaded: (videoUrl: string) => void;
}) => {
  const [video, setVideo] = useState<File | null>(null);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setVideo(file);
    }
  };

  const handleUpload = () => {
    if (video) {
      const reader = new FileReader();
      reader.onload = () => {
        const videoUrl = reader.result as string;
        onVideoUploaded(videoUrl); // Pass the video data URL to the parent component
      };
      reader.readAsDataURL(video);
    }
  };

  return (
    <div className="flex flex-col items-center text-[10px] p-2">
      <input
        type="file"
        accept="video/mp4,video/x-m4v,video/*"
        onChange={handleVideoChange}
        className="mb-4 rounded w-[160px]"
      />
      <div className="flex gap-2">
        <button
          onClick={handleUpload}
          disabled={!video}
          className={`px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-400 transition duration-200 ${
            !video && "opacity-50 cursor-not-allowed"
          }`}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default VideoUpload;
