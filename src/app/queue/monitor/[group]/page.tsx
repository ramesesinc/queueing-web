"use client";

import QueueMonitor from "@/components/QueueMonitor";
const page = ({ params }: { params: { group: string } }) => {
  const { group } = params;

  return (
    <div>
      <QueueMonitor group={group} />
    </div>
  );
};

export default page;
