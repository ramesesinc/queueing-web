"use client";

import React, { useEffect } from "react";
import { usePartnerContext } from "../model/PartnerModel";
import Footer from "./Footer";
import Header from "./Header";

interface MasterLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

const MasterLayout: React.FC<MasterLayoutProps> = ({ children, params }) => {
  const { setId, resources, partner } = usePartnerContext();
  const baseUrl = process.env.NEXT_PUBLIC_FILIPIZEN_URL;

  useEffect(() => {
    if (params.id) {
      setId(params.id);
    }
  }, [setId]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F5F5]">
      <Header
        lguLogo={resources}
        lgucaption={partner?.title}
        href={`${baseUrl}/partners/${params.id}`}
      />
      <div className="flex flex-1 flex-col pt-20">
        <main className="w-full">{children}</main>
      </div>
      <Footer
        copyright={"@Copyright 2024 "}
        filipizen="Filipizen"
        href={`${baseUrl}/partners`}
      />
    </div>
  );
};

export default MasterLayout;
