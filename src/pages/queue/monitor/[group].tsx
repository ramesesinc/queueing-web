import { useRouter } from "next/router";
import Monitor from "../../../components/Monitor";
import { SocketContextProvider } from "../../../stores/socket";

function MonitorPage() {
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
