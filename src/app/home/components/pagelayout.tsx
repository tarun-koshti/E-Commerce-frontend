"use client";
import React, { useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Pagelayout: React.FC<LayoutProps> = ({ children }) => {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  if (typeof window === "undefined" || !client) {
    return <div>Loading...</div>;
  }
  return <main className="container mx-auto p-4">{children}</main>;
};

export default Pagelayout;
