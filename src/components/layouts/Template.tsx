import React from "react";
import Head from "next/head";
import SubTitle from "../ui/SubTitle";

interface TemplateProps {
  title: string;
  description?: string;
  templateType: "template1" | "template2";
  children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({
  title,
  description,
  templateType,
  children,
}) => {
  const templateStyles = {
    template1: {
      bgColor: "bg-white",
      justifyContent: "justify-center",
      flexDirection: "flex-row",
      header: "",
      footer: "",
      textColor: "text-black",
    },
    template2: {
      bgColor: "bg-[#0a5366]",
      justifyContent: "justify-start",
      flexDirection: "",
      header: "hidden",
      footer: " absolute top-5 left-60",
      textColor: "text-white",
    },
  };

  const { bgColor, justifyContent, flexDirection, header, footer, textColor } =
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
    <div className={`min-h-screen ${bgColor} flex flex-col`}>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Head>

      {/* Header */}
      <header className={`${justifyContent} ${header} flex p-4 bg-[#0a5366]`}>
        {renderMainContent("header")}
      </header>

      {/* Main Content */}
      <main
        className={`flex flex-1 items-center justify-center gap-10 p-4 ${flexDirection}`}
      >
        <div className=" basis-[30%] w-full ">
          <SubTitle
            text="now serving"
            className={`text-[15px] leading-3 pl-6 uppercase ${textColor}`}
          />
          {renderMainContent("main-left")}
        </div>
        <div className=" basis-[70%] w-full relative">
          {renderMainContent("main-right")}
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`${justifyContent} ${footer} flex p-4 text-center bg-[#0a5366]`}
      >
        {renderMainContent("footer")}
      </footer>
    </div>
  );
};

export default Template;
