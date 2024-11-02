import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const useTestUsers = () => {
  const user = useQuery(api.functions.user.get);
  if (!user) {
    return [];
  }
  return [user, user, user, user, user];
};

export function PendingFriendsList() {
  const users = useTestUsers();
  return (
    <div className="flex flex-col divide-y">
      <h2 className="text-sm text-muted-foreground p-2.5">Pending Friends</h2>
      {users.map((user, index) => (
        <FriendItem key={index} username={user.username} image={user.image} />
      ))}
    </div>
  );
}

export function AcceptedFriendsList() {
  const users = useTestUsers();
  return (
    <div className="flex flex-col divide-y">
      <h2 className="text-sm text-muted-foreground p-2.5">Accepted</h2>
      {users.map((user, index) => (
        <FriendItem key={index} username={user.username} image={user.image} />
      ))}
    </div>
  );
}

function FriendItem({ username, image }: { username: string; image: string }) {
  return (
    <div className="flex items-center gap-2.5 p-2.5">
      <Avatar className="size-9 border">
        <AvatarImage src={image} />
        <AvatarFallback />
      </Avatar>
      <p className="text-sm font-medium">{username}</p>
    </div>
  );
}
