import { ColorProvider } from "../service/context/color-context";
import { BackgroundImageProvider } from "../service/context/bgimage-context";
import { VideoProvider } from "../service/context/video-context";
import { WindowProvider } from "../service/context/window-context";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LogoImageProvider } from "../service/context/logo-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColorProvider>
      <WindowProvider>
        <VideoProvider>
          <BackgroundImageProvider>
            <LogoImageProvider>
              <Component {...pageProps} />
            </LogoImageProvider>
          </BackgroundImageProvider>
        </VideoProvider>
      </WindowProvider>
    </ColorProvider>
  );
}
