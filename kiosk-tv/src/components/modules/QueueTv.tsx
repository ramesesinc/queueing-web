import React, { useRef, useEffect } from "react";
import TimeDate from "../ui/Time&Date";
import SubTitle from "../ui/SubTitle";
import Image from "next/image";

interface VideoProps {
  src: string;
  controls?: boolean;
  componentType?: string | undefined;
  type?: string | undefined;
  layoutType?: "default" | "custom";
}

const Video: React.FC<VideoProps> = ({
  src,
  controls = true,
  componentType,
  type,
  layoutType = "default",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Access videoRef.current to get the underlying video element
      // You can perform additional setup, event binding, etc. here
    }
  }, []);

  return (
    <div id={componentType}>
      {layoutType === "default" ? (
        <div className="w-full flex flex-col items-center justify-center gap-5">
          <video
            ref={videoRef}
            controls={controls}
            className="rounded-md"
            width={900}
            height={500}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <TimeDate componentType={undefined} />
        </div>
      ) : (
        <div className="flex flex-col border border-gray-300 rounded-lg shadow-lg ">
          <video
            ref={videoRef}
            controls={controls}
            className="rounded-md"
            width={1000}
            height={500}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className=" absolute right-3 top-2">
            <TimeDate componentType={undefined} />
          </div>

          <div className="bg-white h-[70px] flex items-center justify-between px-20">
            <Image
              src={"/images/etracs-logo.png"}
              alt={"etracs logo"}
              width={150}
              height={150}
              quality={100}
            />
            <div className="bg-[#0a5366] rounded-lg p-2">
              <Image
                src={"/images/rameses-logo.png"}
                alt={"etracs logo"}
                width={130}
                height={130}
                quality={100}
              />
            </div>
          </div>
          <div className="bg-gray-200 h-[60px] rounded-b-md flex items-center justify-center">
            <SubTitle
              text="QueueEtracs is a complete enterprise software system for customer queue management system"
              className="text-[15px] p-2 text-center font-normal"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
