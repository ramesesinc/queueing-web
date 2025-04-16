import Image from "next/image";
import React, { useEffect, useState } from "react";
import TimeDate from "../io/Time&Date";
import Weather from "../io/Weather";
import SlideMessage from "../io/SlideMessage";
import { useData } from "@/context/DataContext";



interface VideoProps {
  src?: string | null;
  controls?: boolean;
  componentType?: string | undefined;
  type?: string | undefined;
  layoutType?: "default" | "custom";
  fontFamily?: string;
  videoLink: string;
}

const Video: React.FC<VideoProps> = ({
  src,
  controls = true,
  componentType,
  type,
  layoutType = "default",
  fontFamily,
  videoLink,
}) => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const { general } = useData();
  const datamessage = general.slidemessage;

  useEffect(() => {
    if (datamessage) {
      const timeout = setTimeout(() => {
        setMessage(datamessage);
      }, 500);

      return () => clearTimeout(timeout); 
    }
  }, [datamessage]);

  useEffect(() => {
    const getVideoId = (url: string): { platform: string; id: string | null } => {
      const youtubeRegExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const youtubeMatch = url.match(youtubeRegExp);
      if (youtubeMatch && youtubeMatch[2].length === 11) {
        return { platform: "youtube", id: youtubeMatch[2] };
      }

      const facebookRegExp =
        /(?:facebook\.com\/.*(?:video\.php\?v=|watch\/?\?v=|videos\/|video\/|watch\/v=)|fb\.watch\/)(\d+)/;
      const facebookMatch = url.match(facebookRegExp);
      if (facebookMatch && facebookMatch[1]) {
        return { platform: "facebook", id: facebookMatch[1] };
      }

      return { platform: "", id: null };
    };

    const videoData = getVideoId(videoLink);
    setVideoId(videoData.id);
    setPlatform(videoData.platform);
  }, [videoLink]);

  const getEmbedUrl = () => {
    if (platform === "youtube") {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
    } else if (platform === "facebook") {
      return `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/facebook/videos/${videoId}/?autoplay=1&mute=1`;
    }
    return "";
  };

  if (componentType === "none") {
    return null; // If `componentType` is "none", do not render the video.
  }

  return (
    <div
      id={componentType}
      className="flex flex-col items-center justify-center gap-5"
    >
      {layoutType === "default" ? (
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="w-full max-w-3xl mx-auto">
            {videoId !== null ? (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={getEmbedUrl()}
                  title="Video player"
                  width="720"
                  height="380"
                  className="rounded-xl shadow-[0_3px_6px_0_rgba(0,0,0,0.3)]"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-w-12 aspect-h-9 text-red-500 text-2xl uppercase">
                <div>
                  <div className="absolute text-center">No video link found</div>
                  <iframe
                    src={getEmbedUrl()}
                    title="Video player"
                    width="720"
                    height="380"
                    className="rounded-xl shadow-[0,3px,6px,0,rgba(0,0,0,0.3)]"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

          <TimeDate componentType={undefined} className="" fontFamily={fontFamily} />
        </div>
      ) : (
        <div className="flex flex-col border border-gray-300 rounded-lg shadow-lg">
          <div className="w-full max-w-3xl mx-auto">
            {videoId !== null ? (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={getEmbedUrl()}
                  title="Video player"
                  width="720"
                  height="380"
                  className="rounded-t-xl"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            ) : (
              <div className="aspect-w-16 aspect-h-9 text-red-500 text-xl uppercase relative">
                <div className="absolute inset-0 flex items-end justify-center bottom-5">
                  <span>No video link found</span>
                </div>
                <iframe
                  src={getEmbedUrl()}
                  title="Video player"
                  width="720"
                  height="380"
                  className="rounded-t-lg bg-slate-600"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    backgroundImage: "url(/images/no-video.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "auto",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <div className="bg-white h-[70px] flex items-center justify-between px-20">
            <TimeDate componentType={undefined} />
            <div className="relative -top-[10px]">
              <Weather layout="layout-2" />
            </div>
          </div>

          <div className="bg-gray-200 h-[60px] rounded-b-md flex items-center justify-around px-10 relative">
            <div className="absolute overflow-hidden w-full">
              {message && (
                <SlideMessage
                  message={message}
                  className="text-center"
                  duration={18000}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Video;
