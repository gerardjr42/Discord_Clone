import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { useMutation } from "convex/react";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

export function CreateChannel({ serverId }: { serverId: Id<"servers"> }) {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const createChannel = useMutation(api.functions.channel.create);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const channelId = await createChannel({ name, serverId });
      router.push(`/servers/${serverId}/channels/${channelId}`);
      toast.success("Channel created successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create channel", {
        description:
          error instanceof Error ? error.message : "An unknown error occured",
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarGroupAction>
          <PlusIcon />
        </SidebarGroupAction>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>
          <DialogDescription>
            Enter a name to create a channel.
          </DialogDescription>
        </DialogHeader>
        <form className="contents" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button>Create Channel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
