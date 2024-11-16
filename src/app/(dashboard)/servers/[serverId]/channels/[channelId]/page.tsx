"use client";

import { Messages } from "@/components/messages";
import { useQuery } from "convex/react";
import { use } from "react";
import { api } from "../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../convex/_generated/dataModel";

export default function ChannelPage({
  params,
}: {
  params: Promise<{ channelId: Id<"channels"> }>;
}) {
  const { channelId } = use(params);
  const channel = useQuery(api.functions.channel.get, { id: channelId });
  return (
    <div className="flex flex-col flex-1 divide-y">
      <header className="p-4">
        <h1 className="font-semibold">{channel?.name}</h1>
      </header>
      <Messages id={channelId} />
    </div>
  );
}
