import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import SocketContext from "../stores/socket";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Template from "./layouts/Template";
import QueueGroup from "./modules/QueueGroup";
import QueueTv from "./modules/QueueTv";
import { Settings, OpenSettings } from "./layouts/Settings";
import { useColorContext } from "../service/context/color-context";
import { useWindowContext } from "../service/context/window-context";
import { useVideoContext } from "../service/context/video-context";
import { useBackgroundImageContext } from "../service/context/bgimage-context";
import { useLogoImageContext } from "../service/context/logo-context";
import { useFontFamilyContext } from "../service/context/font-context";
import { useColorsContext } from "../service/context/colors-context";

const Monitor = () => {
  const router = useRouter();
  const group = router.query.group;
  const { data } = useContext<any>(SocketContext);
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const {
    sentNumberOfWindows,
    sentNumberOfVerticalRows,
    sentNumberOfHorizontalCols,
    orientation,
  } = useWindowContext();
  const { headerColor, mainColor, footerColor, windowColor } =
    useColorContext();
  const { showVideo, videoUpload } = useVideoContext();
  const { fontFamily } = useFontFamilyContext();

  const toggleSettings = () => {
    setIsOpenSettings(!isOpenSettings);
  };

  const { hfcolors, addColor, deleteColor, newHfColor, setNewHfColor } =
    useColorsContext();

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

  console.log("hfcolors", hfcolors);

  return (
    <Template
      title="Home Page"
      description="Welcome to our website!"
      templateType="template1"
      headerStyle={{
        backgroundColor: hfcolors.length > 0 ? hfcolors[0].hfcolor : "initial",
      }}
      mainStyle={{
        backgroundColor: mainColor,
        backgroundImage: mainBackground ? `url(${mainBackground})` : undefined,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: backgroundSize,
      }}
      footerStyle={{
        backgroundColor: hfcolors.length > 0 ? hfcolors[0].hfcolor : "initial",
      }}
      headerClass="header"
      mainClass="main"
      footerClass="footer"
      fontFamily={fontFamily}
    >
      <Header
        componentType="header"
        groupName={title}
        groupAddr={"Cebu City"}
        src={logo}
        fontFamily={fontFamily}
      />
      {sentNumberOfWindows !== null &&
      sentNumberOfHorizontalCols !== null &&
      sentNumberOfVerticalRows !== null ? (
        <QueueGroup
          numberOfItems={Math.max(sentNumberOfWindows || 0)}
          componentType="main-left"
          orientation={orientation}
          verticalRows={Math.max(sentNumberOfVerticalRows || 0)}
          horizontalCols={Math.max(sentNumberOfHorizontalCols || 0)}
          queueType={data?.type}
          queueTicket={data?.ticket}
          queueCounter={data?.countercode}
          bgColor={{ backgroundColor: windowColor }}
          fontFamily={fontFamily}
        />
      ) : null}

      <QueueTv
        key={videoUpload}
        src={videoUpload}
        componentType={showVideo ? "main-right" : "none"}
        layoutType="default"
        fontFamily={fontFamily}
      />

      <Footer componentType="footer" fontFamily={fontFamily} />
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
