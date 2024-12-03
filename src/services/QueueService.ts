import Service from "../lib/server/remote-service";

export const getGroups = async ({ objid }: { objid: string }) => {
  const svc = Service.lookup("api/QueueService", "etracs");
  const data = await svc.invoke("getGroup", {
    objid,
  });
  return data;
};

export const getActiveList = async ({ groupid }: { groupid: string }) => {
  const svc = Service.lookup("api/QueueMonitorService", "etracs");
  const data = await svc.invoke("getActiveList", {
    groupid,
  });
  console.log(data);
  return data;
};
