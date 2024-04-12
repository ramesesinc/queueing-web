import { ColorProvider } from "../service/context/color-context";
import { BackgroundImageProvider } from "../service/context/image-context";
import { VideoProvider } from "../service/context/video-context";
import { WindowProvider } from "../service/context/window-context";
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColorProvider>
      <WindowProvider>
        <VideoProvider>
          <BackgroundImageProvider>
            <Component {...pageProps} />
          </BackgroundImageProvider>
        </VideoProvider>
      </WindowProvider>
    </ColorProvider>
  );
}
