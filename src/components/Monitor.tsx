import { useRouter } from "next/router";
import { useContext, useState } from "react";

import SocketContext from "../stores/socket";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Template from "./layouts/Template";
import QueueGroup from "./modules/QueueGroup";
import QueueTv from "./modules/QueueTv";

import { useBplsData } from "../service/context/bplsdatas-context";
import { useRptData } from "../service/context/rptdata-context";
import { useTcData } from "../service/context/tcdata-context";

const Monitor = () => {
  const router = useRouter();
  const group = router.query.group;
  const { data } = useContext<any>(SocketContext);

  const { bplsdata } = useBplsData();
  const { rptdata } = useRptData();
  const { tcdata } = useTcData();

  let title = "";
  let headerFooterBgColor = "";
  let bgImage = "";
  let bgSize = "";
  let windowCount = 0;
  let windowColors = "";
  let verticalRowsCount = 0;
  let horizontalColsCount = 0;
  let xyAxis = "";
  let showVideo = true;
  let videoUrl = "";
  let videoPosition = "";
  let windowPosition = "";
  let buzz = "";

  if (group === "bpls") {
    title = "Business Permit and Licensing System";
    headerFooterBgColor = bplsdata.bpls.color;
    bgImage = bplsdata.bpls.bgUrl;
    bgSize = bplsdata.bpls.bgSize;
    windowCount = bplsdata.bpls.windowCount;
    verticalRowsCount = bplsdata.bpls.verticalRowsCount;
    horizontalColsCount = bplsdata.bpls.horizontalColsCount;
    xyAxis = bplsdata.bpls.xyAxis;
    windowColors = bplsdata.bpls.windowColor;
    showVideo = bplsdata.bpls.showVideo;
    videoUrl = bplsdata.bpls.videoUrl;
    videoPosition = bplsdata.bpls.videoposition;
    windowPosition = bplsdata.bpls.windowposition;
    buzz = bplsdata.bpls.buzz;
  } else if (group === "rpt") {
    title = "Real Property Tax";
    headerFooterBgColor = rptdata.rpt.color;
    bgImage = rptdata.rpt.bgUrl;
    bgSize = rptdata.rpt.bgSize;
    windowCount = rptdata.rpt.windowCount;
    verticalRowsCount = rptdata.rpt.verticalRowsCount;
    horizontalColsCount = rptdata.rpt.horizontalColsCount;
    xyAxis = rptdata.rpt.xyAxis;
    windowColors = rptdata.rpt.windowColor;
    showVideo = rptdata.rpt.showVideo;
    videoUrl = rptdata.rpt.videoUrl;
    videoPosition = rptdata.rpt.videoposition;
    windowPosition = rptdata.rpt.windowposition;
    buzz = rptdata.rpt.buzz;
  } else if (group === "tc") {
    title = "Treasury and Collections";
    headerFooterBgColor = tcdata.tc.color;
    bgImage = tcdata.tc.bgUrl;
    bgSize = tcdata.tc.bgSize;
    windowCount = tcdata.tc.windowCount;
    verticalRowsCount = tcdata.tc.verticalRowsCount;
    horizontalColsCount = tcdata.tc.horizontalColsCount;
    xyAxis = tcdata.tc.xyAxis;
    windowColors = tcdata.tc.windowColor;
    showVideo = tcdata.tc.showVideo;
    videoUrl = tcdata.tc.videoUrl;
    videoPosition = tcdata.tc.videoposition;
    windowPosition = tcdata.tc.windowposition;
    buzz = tcdata.tc.buzz;
  } else {
    title = `${group || "Unknown Group"}`;
  }

  return (
    <>
      <Template
        templateType="template1"
        headerStyle={{
          backgroundColor: headerFooterBgColor,
        }}
        mainStyle={{
          backgroundImage: bgImage ? `url(${bgImage})` : undefined,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: bgSize,
        }}
        footerStyle={{
          backgroundColor: headerFooterBgColor,
        }}
        headerClass="header"
        mainClass="main"
        footerClass="footer"
        fontFamily={bplsdata.bpls.fontFamily}
      >
        <Header
          componentType="header"
          groupName={title}
          groupAddr={"Cebu City"}
          src={bplsdata.bpls.logoUrl}
          fontFamily={bplsdata.bpls.fontFamily}
        />

        {windowCount !== 0 &&
        verticalRowsCount != 0 &&
        horizontalColsCount != 0 ? (
          <QueueGroup
            numberOfItems={Math.max(windowCount || 0)}
            componentType={windowPosition}
            orientation={xyAxis === "vertical" ? "vertical" : "horizontal"}
            verticalRows={Math.max(verticalRowsCount || 0)}
            horizontalCols={Math.max(horizontalColsCount || 0)}
            queueType={data.type}
            queueTicket={data.ticketno}
            queueCounter={data.countercode}
            bgColor={{ backgroundColor: windowColors }}
            fontFamily={bplsdata.bpls.fontFamily}
          />
        ) : (
          0
        )}
        <QueueTv
          componentType={showVideo ? `${videoPosition}` : "none"}
          layoutType="default"
          fontFamily={bplsdata.bpls.fontFamily}
          videoLink={videoUrl}
        />
        <Footer componentType="footer" fontFamily={bplsdata.bpls.fontFamily} />
        {data.ticketno}
      </Template>
    </>
  );
};

export default Monitor;
