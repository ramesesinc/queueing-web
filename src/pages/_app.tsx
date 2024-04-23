import type { AppProps } from "next/app";
import { BackgroundImageProvider } from "../service/context/bgimage-context";
import { ColorProvider } from "../service/context/color-context";
import { DataProvider } from "../service/context/data-context";
import { FontFamilyProvider } from "../service/context/font-context";
import { LogoImageProvider } from "../service/context/logo-context";
import { VideoProvider } from "../service/context/video-context";
import { WindowProvider } from "../service/context/window-context";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColorProvider>
      <WindowProvider>
        <VideoProvider>
          <BackgroundImageProvider>
            <LogoImageProvider>
              <FontFamilyProvider>
                <DataProvider>
                  <Component {...pageProps} />
                </DataProvider>
              </FontFamilyProvider>
            </LogoImageProvider>
          </BackgroundImageProvider>
        </VideoProvider>
      </WindowProvider>
    </ColorProvider>
  );
}
