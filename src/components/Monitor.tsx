import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import SocketContext from "../stores/socket";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Template from "./layouts/Template";
import QueueGroup from "./modules/QueueGroup";
import QueueTv from "./modules/QueueTv";
import Button from "./ui/Button";
import ToggleBtn from "./ui/ToggleBtn";

interface Message {
  group: string;
  section: string;
  ticket: string;
}

const Monitor = () => {
  const router = useRouter();
  const group = router.query.group;
  const { data } = useContext<any>(SocketContext);
  const [showVideo, setShowVideo] = useState<boolean>(true);

  useEffect(() => {
    const storedShowVideo = localStorage.getItem("showVideo");
    if (storedShowVideo !== null) {
      setShowVideo(storedShowVideo === "true");
    }
  }, []);

  const toggleVideo = () => {
    const newShowVideo = !showVideo;
    setShowVideo(newShowVideo);
    localStorage.setItem("showVideo", newShowVideo.toString());
  };

  let title = "";

  if (group === "bpls") {
    title = "Business Permit and Licensing System";
  } else if (group === "rpt") {
    title = "Real Property Tax";
  } else if (group === "tc") {
    title = "Treasury and Collections";
  } else {
    title = `${group || "Unknown Group"}`;
  }

  return (
    <Template
      title="Home Page"
      description="Welcome to our website!"
      templateType="template1" //there a two templates. { template1 and template2 }. To change the template replace the templateType=" " to template1 or template2.
    >
      <Header componentType="header" />
      <QueueGroup
        numberOfItems={8}
        componentType="main-left"
        orientation="horizontal" // available properties horizontal and vertical
        verticalRows={0}
        horizontalCols={4}
        queueType={data?.type}
        queueTicket={data?.ticket}
        queueCounter={data?.countercode}
      />
      <QueueTv
        src={""}
        componentType="main-right"
        layoutType="default" //there a two layouts. { default and custom }. To change the layout replace the layoutType=" " to default or custom.
      />
      <ToggleBtn
        componentType="videoswitch"
        onClick={toggleVideo}
        isActive={showVideo}
        className=" !absolute top-2 right-2"
        text={showVideo ? "hide video" : "show video"}
      />
      <Footer
        componentType="footer"
        groupName={title}
        groupAddr={"Cebu City"}
      />
    </Template>
  );
};

export default Monitor;
