import type { AppProps } from "next/app";
import { BplsDataProvider } from "../service/context/bplsdatas-context";
import { VideoProvider } from "../service/context/video-context";
import "../styles/globals.css";
import { RptDataProvider } from "../service/context/rptdata-context";
import { TcDataProvider } from "../service/context/tcdata-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <VideoProvider>
      <BplsDataProvider>
        <RptDataProvider>
          <TcDataProvider>
            <Component {...pageProps} />
          </TcDataProvider>
        </RptDataProvider>
      </BplsDataProvider>
    </VideoProvider>
  );
}
