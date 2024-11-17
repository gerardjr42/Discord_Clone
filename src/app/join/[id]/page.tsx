// When sending a user to the join page, we need to check if they have an invite
// If they do, we need to validate the invite
// If the invite is valid, we need to add the user to the server
// If the invite is invalid, we need to redirect them to the home page
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInButton } from "@clerk/nextjs";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export default function JoinPage({
  params,
}: {
  params: Promise<{ id: Id<"invites"> }>;
}) {
  const { id } = use(params);
  const invite = useQuery(api.functions.invite.get, { id });
  const join = useMutation(api.functions.invite.join);
  const router = useRouter();

  const handleJoin = async () => {
    await join({ id });
    router.push(
      `/servers/${invite?.server._id}/channels/${invite?.server.defaultChannelId}`
    );
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Card className="max-w-96 w-full">
        <CardHeader>
          <CardTitle>Join {invite?.server.name}</CardTitle>
          <CardDescription>
            You&apos;ve been invited to join{" "}
            <span className="font-semibold">{invite?.server.name}</span>
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col items-stretch gap-2">
          <Authenticated>
            <Button onClick={handleJoin}>Join Server</Button>
          </Authenticated>
          <Unauthenticated>
            <Button asChild>
              <SignInButton forceRedirectUrl={`/join/${id}`}>
                Sign in to join
              </SignInButton>
            </Button>
          </Unauthenticated>
          <Button variant="secondary" asChild>
            <Link href="/dms">Not now</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
