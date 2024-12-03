import { useRouter } from "next/router";
import Monitor from "../../../components/Monitor";
import { SocketContextProvider } from "../../../stores/queue";

function MonitorPage({ params }: { params: any }) {
  const router = useRouter();
  const group = router.query.group;

  return (
    <div>
      <SocketContextProvider>
        <Monitor />
      </SocketContextProvider>
    </div>
  );
}

export default MonitorPage;
