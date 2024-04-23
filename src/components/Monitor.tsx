import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import SocketContext from "../stores/socket";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Template from "./layouts/Template";
import QueueGroup from "./modules/QueueGroup";
import QueueTv from "./modules/QueueTv";
import { useColorContext } from "../service/context/color-context";
import { useVideoContext } from "../service/context/video-context";
import { useBackgroundImageContext } from "../service/context/bgimage-context";
import { useLogoImageContext } from "../service/context/logo-context";
import { useData } from "../service/context/data-context";

const Monitor = () => {
  const router = useRouter();
  const group = router.query.group;
  const { data } = useContext<any>(SocketContext);
  // const [isOpenSettings, setIsOpenSettings] = useState(false);
  const { headerColor, mainColor, footerColor, windowColor } =
    useColorContext();
  const { showVideo, videoUpload } = useVideoContext();

  // const toggleSettings = () => {
  //   setIsOpenSettings(!isOpenSettings);
  // };

  const { datas } = useData();

  const { mainBackground, backgroundSize } = useBackgroundImageContext();
  const { logo } = useLogoImageContext();

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
      templateType="template1"
      headerStyle={{
        backgroundColor: datas.color,
      }}
      mainStyle={{
        backgroundColor: mainColor,
        backgroundImage: mainBackground ? `url(${mainBackground})` : undefined,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: backgroundSize,
      }}
      footerStyle={{
        backgroundColor: datas.color,
      }}
      headerClass="header"
      mainClass="main"
      footerClass="footer"
      fontFamily={datas.fontFamily}
    >
      <Header
        componentType="header"
        groupName={title}
        groupAddr={"Cebu City"}
        src={logo}
        fontFamily={datas.fontFamily}
      />

      {datas.windowCount !== 0 &&
      datas.verticalRowsCount != 0 &&
      datas.horizontalColsCount != 0 ? (
        <QueueGroup
          numberOfItems={Math.max(datas.windowCount || 0)}
          componentType="main-left"
          orientation={datas.xyAxis === "vertical" ? "vertical" : "horizontal"}
          verticalRows={Math.max(datas.verticalRowsCount || 0)}
          horizontalCols={Math.max(datas.horizontalColsCount || 0)}
          queueType={data?.type}
          queueTicket={data?.ticket}
          queueCounter={data?.countercode}
          bgColor={{ backgroundColor: windowColor }}
          fontFamily={datas.fontFamily}
        />
      ) : (
        0
      )}
      <QueueTv
        key={videoUpload}
        src={videoUpload}
        componentType={showVideo ? "main-right" : "none"}
        layoutType="default"
        fontFamily={datas.fontFamily}
      />
      <Footer componentType="footer" fontFamily={datas.fontFamily} />
      {/* <Settings
        isOpen={isOpenSettings}
        toggleSidebar={toggleSettings}
        componentType="settings"
      />

      <OpenSettings componentType="settings" onClick={toggleSettings}>
        {isOpenSettings ? "Close" : "Open"}
      </OpenSettings> */}
    </Template>
  );
};

export default Monitor;
