"use client";

import React, { useEffect, useState } from "react";
import Header from "../io/Header";
import Footer from "../io/Footer";
import { lookupService } from "@/lib/client";
import { useData } from "@/context/DataContext";

type QueueMonitorProps = {
  group: string;
  children: React.ReactNode;
};

const Template = ({ children, group }: QueueMonitorProps) => {
  const [datas, setDatas] = useState<Record<string, any>>({});
  const svc = lookupService("QueueService");
  const { groups, general } = useData();

  
  const fetchGroups = async () => {
    const res = await svc?.invoke("getGroups", {
      objid: group,
      lguname: general.lguname,
    });

    setDatas(res);
  };

  useEffect(() => {
    fetchGroups();
  }, [general.lguname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header props={datas} color={groups.color} lgulogo={general.logoUrl} />
      <main
        className="flex-1"
        style={{
          backgroundColor: "",
          backgroundImage: groups.bgUrl ? `url(${groups.bgUrl})` : undefined,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: groups.bgSize,
        }}
      >
        {children}
      </main>
      <Footer color={groups.color} />
    </div>
  );
};

export default Template;
