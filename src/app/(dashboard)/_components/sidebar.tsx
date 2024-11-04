import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignOutButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { NewDirectMessage } from "./new-direct-message";

const useTestDirectMessage = () => {
  const user = useQuery(api.functions.user.get);
  if (!user) {
    return [];
  }
  return [user, user, user];
};

export default function DashboardSidebar() {
  const user = useQuery(api.functions.user.get);
  const directMessages = useTestDirectMessage();
  const pathname = usePathname();

  if (!user) {
    return null;
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/">
                    <User2Icon />
                    Friends
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroup>
            <SidebarGroupLabel>Direct Messages</SidebarGroupLabel>
            <NewDirectMessage />
            <SidebarGroupContent>
              <SidebarMenu>
                {directMessages.map((directMessages) => (
                  <SidebarMenuItem key={directMessages._id}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === `/dms/${directMessages._id}`}
                    >
                      <Link href={`/dms/${directMessages._id}`}>
                        <Avatar className="size-6">
                          <AvatarImage src={directMessages.image} />
                          <AvatarFallback>
                            {directMessages.username[0]}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-medium">{directMessages.username}</p>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarImage src={user.image} />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                      </Avatar>
                      <p className="font-medium">{user.username}</p>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <SignOutButton />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
