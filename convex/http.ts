// The recommended way to sync data between Clerk and your application is to use webhooks.
//Refer to this doc for steps on how to sync data: https://clerk.com/docs/integrations/webhooks/sync-data#sync-clerk-data-to-your-application-with-webhooks

import { WebhookEvent } from "@clerk/nextjs/server";
import { HttpRouter } from "convex/server";
import { Webhook } from "svix";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
const http = new HttpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const body = await validateRequest(req);
    if (!body) {
      return new Response("Unauthorized", { status: 401 });
    }
    switch (body.type) {
      case "user.created":
        await ctx.runMutation(internal.functions.user.upsert, {
          username: body.data.username!,
          image: body.data.image_url,
          clerkId: body.data.id,
        });
        break;
      case "user.updated":
        await ctx.runMutation(internal.functions.user.upsert, {
          username: body.data.username!,
          image: body.data.image_url,
          clerkId: body.data.id,
        });
        break;
      case "user.deleted":
        if (body.data.id) {
          await ctx.runMutation(internal.functions.user.remove, {
            clerkId: body.data.id,
          });
        }
        break;
    }
    return new Response("OK", { status: 200 });
  }),
});

const validateRequest = async (req: Request) => {
  // Get the headers
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  const text = await req.text();

  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
    return webhook.verify(text, {
      "svix-id": svix_id!,
      "svix-timestamp": svix_timestamp!,
      "svix-signature": svix_signature!,
    }) as unknown as WebhookEvent;
  } catch (error) {
    return null;
  }
};

export default http;
