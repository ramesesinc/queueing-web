"use client";

import { getAnnouncement } from "@/actions/QueueService";
import QueueMonitor from "@/components/templates/QueueMonitor";
import Template from "@/components/templates/Template";
import { DataProvider, useData } from "@/context/DataContext";
const page = ({ params }: { params: { group: string } }) => {
  const { group } = params;
  const { general } = useData();

  return (
    <div style={{ fontFamily: general.fontFamily }}>
      <DataProvider groupId={group}>
        <Template group={group}>
          <QueueMonitor group={group}/>
        </Template>
      </DataProvider>
    </div>
  );
};

export default page;
