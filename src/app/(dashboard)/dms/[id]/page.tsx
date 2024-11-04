"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "convex/react";
import { MoreVerticalIcon, SendIcon, TrashIcon } from "lucide-react";
import { use } from "react";
import { api } from "../../../../../convex/_generated/api";

export default function MessagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const user = useQuery(api.functions.user.get);
  return (
    <div className="flex flex-1 flex-col divide-y max-h-screen">
      <header className="flex items-center gap-2 p-4">
        <Avatar className="size-8 border">
          <AvatarImage src={user!.image} />
          <AvatarFallback />
        </Avatar>
        <h1 className="font-semibold">{user?.username}</h1>
      </header>
      <ScrollArea className="h-full py-4">
        <MessageItem />
      </ScrollArea>
      <MessageInput />
    </div>
  );
}

function MessageItem() {
  const user = useQuery(api.functions.user.get);
  return (
    <div className="flex items-center px-4 gap-2">
      <Avatar className="size-8 border">
        <AvatarImage src={user!.image} />
        <AvatarFallback />
      </Avatar>
      <div className="flex flex-col mr-auto">
        <p className="text-sm text-muted-foreground">{user!.username}</p>
        <p className="text-sm">Hello, world!</p>
      </div>
      <MessageActions />
    </div>
  );
}

function MessageActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVerticalIcon className="size-4 text-muted-foreground" />
        <span className="sr-only">Message Actions</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="text-destructive">
          <TrashIcon />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MessageInput() {
  return (
    <div className="flex items-center gap-2 p-4">
      <Input placeholder="Message..." />
      <Button>
        <SendIcon />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  );
}
