import React from "react";
import Head from "next/head";
import SubTitle from "../ui/SubTitle";

interface TemplateProps {
  title: string;
  description?: string;
  templateType: "template1" | "template2";
  children?: React.ReactNode;
  headerStyle?: React.CSSProperties;
  mainStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  headerClass?: string;
  mainClass?: string;
  footerClass?: string;
  fontFamily?: string;
}

const Template: React.FC<TemplateProps> = ({
  title,
  description,
  templateType,
  children,
  headerStyle,
  mainStyle,
  footerStyle,
  headerClass,
  mainClass,
  footerClass,
  fontFamily,
}) => {
  const templateStyles = {
    template1: {
      bgColors: "bg-white",
      justifyContent: "justify-center",
      flexDirection: "flex-row",
      header: "",
      footer: "",
      textColor: "text-black",
    },
    template2: {
      bgColors: "bg-[#0a5366]",
      justifyContent: "justify-start",
      flexDirection: "",
      header: "",
      footer: "",
      textColor: "text-white",
    },
  };

  const { bgColors, justifyContent, flexDirection, header, footer, textColor } =
    templateStyles[templateType] || templateStyles.template1;

  const renderMainContent = (type: string) => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const { componentType } = child.props;
        if (type === componentType) {
          switch (type) {
            case "header":
              return <div className="header-wrapper">{child}</div>;
            case "footer":
              return <div className="footer-wrapper">{child}</div>;
            default:
              return child;
          }
        }
      }
      return null;
    });
  };

  return (
    <div className={`min-h-screen ${bgColors}  flex flex-col`}>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Head>

      {/* Header */}
      <header
        className={`${justifyContent} ${headerClass} ${header} py-2 bg-[#0a5366]`}
        style={headerStyle}
      >
        {renderMainContent("header")}
      </header>
      {/* video switch to hide and show the video */}
      {renderMainContent("videoswitch")}

      {/* Main Content */}

      <div
        className={`flex flex-1 items-center justify-center gap-10 p-4 ${mainClass} ${
          flexDirection || "flex-row"
        }`}
        style={mainStyle}
      >
        {children &&
          !React.Children.toArray(children).some(
            (child) =>
              React.isValidElement(child) &&
              child.props.componentType === "none"
          ) && (
            <div className="basis-[70%] w-full relative">
              {renderMainContent("main-right")}
            </div>
          )}

        {/* main-left */}
        {renderMainContent("main-left") && (
          <div
            className={`${
              !renderMainContent("main-right") && "flex justify-center"
            }`}
          >
            <div style={{ fontFamily: fontFamily }}>
              <SubTitle
                text="now serving"
                className={`text-[15px] leading-3 ml-5 !font-bold uppercase w-[20%] text-center ${textColor} bg-gray-200 bg-opacity-50 rounded p-2`}
              />
            </div>

            {renderMainContent("main-left")}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        style={footerStyle}
        className={`${justifyContent} ${footerClass} ${footer} relative flex p-2 text-center bg-[#0a5366]`}
      >
        {renderMainContent("footer")}
        {renderMainContent("settings")}
      </footer>
    </div>
  );
};

export default Template;
