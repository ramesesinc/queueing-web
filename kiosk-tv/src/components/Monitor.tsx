import React, { useContext, useEffect, useState } from "react";
import Footer from "./layouts/Footer";
import Template from "./layouts/Template";
import QueueGroup from "./modules/QueueGroup";
import QueueTv from "./modules/QueueTv";
import { useRouter } from "next/router";
import Header from "./layouts/Header";
import SocketContext from "../stores/socket";

interface Message {
  group: string;
  section: string;
  ticket: string;
}

const Monitor = () => {
  const router = useRouter();
  const group = router.query.group;
  const [messages, setMessages] = useState<Message[]>([]);
  const { data } = useContext<any>(SocketContext);

  useEffect(() => {
    if (Array.isArray(data)) {
      setMessages((prevMessages) => [...prevMessages, ...data]);
    }
  }, [data]);

  let title = "";

  if (data?.group === "bpls") {
    title = "Business Permit and Licensing System";
  } else if (data?.group === "rpt") {
    title = "Real Property Tax";
  } else if (data?.group === "tc") {
    title = "Treasury and Collections"; // Assign the value directly
  } else {
    title = `${data?.group || "Unknown Group"}`;
  }

  return (
    <Template
      title="Home Page"
      description="Welcome to our website!"
      templateType="template1" //there a two templates. { template1 and template2 }. To change the template replace the templateType=" " to template1 or template2.
    >
      <Header componentType="header" />
      <QueueGroup
        numberOfItems={4}
        componentType="main-left"
        orientation="vertical" // available properties horizontal and vertical
        verticalRows={2}
        horizontalCols={0}
        queueSections={data?.section}
        queueTicket={data?.ticket}
      />
      <QueueTv
        src={"/videos/video.mp4"}
        componentType="main-right"
        layoutType="default" //there a two layouts. { default and custom }. To change the layout replace the layoutType=" " to default or custom.
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
