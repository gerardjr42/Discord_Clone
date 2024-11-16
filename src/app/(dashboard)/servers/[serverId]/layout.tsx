"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { use } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { ServerMembers } from "./server-members";
import { ServerSidebar } from "./server-sidebar";

export default function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: Id<"servers"> }>;
}) {
  const { serverId } = use(params);

  return (
    <SidebarProvider>
      <ServerSidebar id={serverId} />
      {children}
      <ServerMembers id={serverId} />
    </SidebarProvider>
  );
}
