import { useRouter } from "next/router";
import { useContext } from "react";
import { useBackgroundImageContext } from "../service/context/bgimage-context";
import { useColorContext } from "../service/context/color-context";
import { useFontFamilyContext } from "../service/context/font-context";
import { useLogoImageContext } from "../service/context/logo-context";
import { useVideoContext } from "../service/context/video-context";
import { useWindowContext } from "../service/context/window-context";
import SocketContext from "../stores/socket";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Template from "./layouts/Template";
import QueueGroup from "./modules/QueueGroup";
import QueueTv from "./modules/QueueTv";

const Monitor = () => {
  const router = useRouter();
  const group = router.query.group;
  const { data } = useContext<any>(SocketContext);
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
        backgroundColor: "datas.color",
      }}
      mainStyle={{
        backgroundColor: mainColor,
        backgroundImage: mainBackground ? `url(${mainBackground})` : undefined,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: backgroundSize,
      }}
      footerStyle={{
        backgroundColor: "datas.color",
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
          queueType={data.type}
          queueTicket={data.ticketno}
          queueCounter={data.countercode}
          bgColor={{ backgroundColor: windowColor }}
          fontFamily={fontFamily}
        />
      ) : null}

      <QueueTv
        key={"videoUpload"}
        src={"videoUpload"}
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
